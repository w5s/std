import { Int, Option, pipe, Random, Result, Task, Time, TimeDuration } from '@w5s/core';

const resolveNone = Task.resolve(Option.None);

/**
 * A structure that represents the current state of a retry operation.
 */
export interface RetryState {
  /**
   * The index of the current attempt.
   */
  readonly retryIndex: Int;
  /**
   * The cumulative delay of the all attempts.
   */
  readonly retryCumulativeDelay: TimeDuration;
  /**
   * The duration of the current retry attempt
   */
  readonly retryPreviousDelay: Option<TimeDuration>;
}
/**
 * RetryState constructor
 *
 * @example
 * ```ts
 * const retryState = new RetryState({
 *  retryIndex: Int(0),
 *  retryCumulativeDelay: TimeDuration.seconds(1),
 *  retryPreviousDelay: TimeDuration.seconds(1),
 * });
 * ```
 * @param parameters - The parameters to create the RetryState
 */
export function RetryState(parameters: Partial<RetryState>): RetryState {
  return {
    retryIndex: parameters.retryIndex ?? (0 as Int),
    retryCumulativeDelay: parameters.retryCumulativeDelay ?? (0 as TimeDuration),
    retryPreviousDelay: parameters.retryPreviousDelay,
  };
}
/**
 * Default RetryState
 */
export const defaultRetryState: RetryState = RetryState({
  retryIndex: 0 as Int,
  retryCumulativeDelay: 0 as TimeDuration,
  retryPreviousDelay: Option.None,
});

export interface RetryPolicy {
  (state: RetryState): Task<Option<TimeDuration>, never>;
}
export namespace RetryPolicy {
  /**
   * Map the policy delay using `mapFn(delay)`
   *
   * @example
   * ```ts
   * const policy = RetryPolicy.wait(TimeDuration(2));// Wait 2 seconds policy
   * const mappedPolicy = RetryPolicy.map(policy, (delay) => TimeDuration(delay * 3));// Wait 6 seconds policy
   * ```
   * @param policy - The policy
   * @param mapFn - The map function
   */
  export function map(policy: RetryPolicy, mapFn: (delay: TimeDuration) => TimeDuration): RetryPolicy {
    return (state: RetryState) => Task.map(policy(state), (delay) => Option.map(delay, mapFn));
  }

  /**
   * Apply a retry policy to a retry state.
   *
   * @example
   * ```ts
   * const policy = RetryPolicy.wait(TimeDuration(1));
   * const oldState = RetryState({ retryIndex: Int(0), retryCumulativeDelay: TimeDuration(1), retryPreviousDelay: Option.None });
   * const newState = RetryPolicy.apply(policy, retryState);
   * Task.unsafeRun(newState) // Result.Ok(RetryState({ retryIndex: Int(1), retryCumulativeDelay: 1, retryPreviousDelay: 1 }))
   * ```
   * @param policy - The policy to apply
   * @param state - The current state of the retry operation
   */
  export function apply(policy: RetryPolicy, state: RetryState): Task<Option<RetryState>, never> {
    return Task.map(policy(state), (retryPreviousDelay) =>
      Option.isNone(retryPreviousDelay)
        ? retryPreviousDelay
        : RetryState({
            retryIndex: (+state.retryIndex + 1) as Int,
            retryCumulativeDelay: (+state.retryCumulativeDelay + +retryPreviousDelay) as TimeDuration,
            retryPreviousDelay,
          })
    );
  }

  /**
   * Apply a retry policy to a retry state and wait `state.retryPreviousDelay` milliseconds.
   *
   * @example
   * ```ts
   * const policy = RetryPolicy.wait(TimeDuration(1));
   * const oldState = RetryState({ retryIndex: Int(0), retryCumulativeDelay: TimeDuration(1), retryPreviousDelay: Option.None });
   * const newState = RetryPolicy.applyAndDelay(policy, retryState);
   * await Task.unsafeRun(newState) // Result.Ok(RetryState({ retryIndex: Int(1), retryCumulativeDelay: 1, retryPreviousDelay: 1 }))
   * ```
   * @param policy - The policy to apply
   * @param state - The current state of the retry operation
   */
  export function applyAndDelay(policy: RetryPolicy, state: RetryState): Task<Option<RetryState>, never> {
    return Task.andRun(apply(policy, state), (nextStatus) =>
      Time.delay(nextStatus?.retryPreviousDelay ?? (0 as TimeDuration))
    );
  }

  /**
   * Combines two policies into one. This policy will return :
   * - `Option.None`, if one of the policies returns `Option.None`.
   * - `Option.Some(max(leftDelay, rightDelay))`, else
   *
   * @example
   * ```ts
   * const retryWait1ms = RetryPolicy.wait(TimeDuration(1));
   * const retryLimit3 = RetryPolicy.limitRetries(3);
   * const retryWait1msAndLimit3 = RetryPolicy.append(retryWait1ms, retryLimit3);
   * ```
   * @param left - The left policy
   * @param right - The right policy
   */
  export function append(left: RetryPolicy, right: RetryPolicy): RetryPolicy {
    return (state: RetryState) =>
      pipe([left(state), right(state)] as const).to(
        (_) => Task.all(_),
        (_) =>
          Task.map(_, ([leftResult, rightResult]) =>
            Option.isNone(leftResult) || Option.isNone(rightResult)
              ? Option.None
              : Option.Some(Math.max(+leftResult, +rightResult) as TimeDuration)
          )
      );
  }

  /**
   * A retry policy that never retries
   */
  export const never: RetryPolicy = (_state) => resolveNone;

  /**
   * A retry policy with a constant delay and unlimited retries.
   *
   * @category Constructor
   * @example
   * ```ts
   * const policy = RetryPolicy.wait(TimeDuration(1)); // 1ms, 1ms, 1ms, 1ms, ...
   * ```
   * @param delay - The waiting delay between two attempts
   */
  export function wait(delay: TimeDuration): RetryPolicy {
    return (_state) => Task.resolve(delay);
  }

  /**
   * Grow delay exponentially each iteration.
   * Each delay will increase by a factor of two.
   *
   * @category Constructor
   * @example
   * ```ts
   * const policy = RetryPolicy.waitExponential(TimeDuration(1)); // 1ms, 2ms, 4ms, 8ms, ...
   * ```
   * @param initialDelay - The initial delay
   */
  export function waitExponential(initialDelay: TimeDuration): RetryPolicy {
    return ({ retryIndex }) => Task.resolve(Option.Some((initialDelay * 2 ** retryIndex) as TimeDuration));
  }

  /**
   * FullJitter exponential delay as explained in AWS Architecture
   * temp = min(cap, initialDelay * 2 ** attempt)
   * sleep = temp / 2 + random_between(0, temp / 2)
   *
   * @see https://aws.amazon.com/fr/blogs/architecture/exponential-backoff-and-jitter/
   * @category Constructor
   * @example
   * ```ts
   * const policy = RetryPolicy.waitFullJitter(TimeDuration(1)); // 0ms, 1 + rand(0, 1) ms, 2 + rand(0, 2)ms, ...
   * ```
   * @param initialDelay - The initial delay
   * @param generator - The random generator
   */
  export function waitExponentialJitter(initialDelay: TimeDuration, generator = Random.defaultGenerator): RetryPolicy {
    return ({ retryIndex }) => {
      const temporary = Int((initialDelay * 2 ** retryIndex) / 2);
      return Task.map(Random.Generator.int(generator)(Int(0), temporary), (randomValue) =>
        Option.Some((+temporary + +randomValue) as TimeDuration)
      );
    };
  }

  /**
   * A retry policy that retries immediately, but only up to `count` times.
   *
   * @category Constructor
   * @param count - The number of retries to allow
   */
  export function retries(count: Int): RetryPolicy {
    return ({ retryIndex }) => Task.resolve(retryIndex >= count ? Option.None : Option.Some(0 as TimeDuration));
  }

  function transform(
    policy: RetryPolicy,
    mapFn: (delay: TimeDuration, state: RetryState) => Option<TimeDuration>
  ): RetryPolicy {
    return (state) =>
      Task.map(policy(state), (delayMs) => (Option.isSome(delayMs) ? mapFn(delayMs, state) : Option.None));
  }

  /**
   * Set a time upper bound for any delays that may be directed by the given policy.
   *
   * @param policy - The policy to limit
   * @param maxDelay - The maximum delay between two attempts
   */
  export function waitMax(policy: RetryPolicy, maxDelay: TimeDuration): RetryPolicy {
    return transform(policy, (delay) => Math.min(maxDelay, delay) as TimeDuration);
  }
}

interface RetryDoneResult {
  readonly done: true;
}
interface RetryContinueResult {
  readonly done: false;
  readonly value: Option<TimeDuration>;
}

/**
 * Acts like the iterator protocol for retry attempts.
 * When `{ done: true }` is returned, the retry operation is complete.
 * When `{ done: false, value: Option.None }` is returned, the retry operation will be done using the default policy delay.
 * When `{ done: false, value: Option.Some(TimeDuration(...)) }` is returned, the retry operation will be done using given delay.
 */
export type RetryResult = RetryDoneResult | RetryContinueResult;

export function retrying<Value, Error>(
  taskOrGetter: Task<Value, Error> | ((state: RetryState) => Task<Value, Error>),
  options: retrying.Options<Value, Error>
): Task<Value, Error> {
  const { policy, check, initialState = defaultRetryState } = options;
  const go = (state: RetryState): Task<Value, Error> =>
    andThenResult(
      typeof taskOrGetter === 'function' ? taskOrGetter(state) : taskOrGetter,

      (result) =>
        Task.andThen(check(result), (retryResult) =>
          retryResult.done === true
            ? Task(() => result)
            : pipe(policy).to(
                (_) =>
                  Option.match(retryResult.value, {
                    Some: (value) => RetryPolicy.map(_, () => value),
                    None: () => _,
                  }),
                (_) => RetryPolicy.applyAndDelay(_, state),
                (_) =>
                  Task.andThen(_, (appliedStatus) =>
                    Option.match(appliedStatus, {
                      None: () => Task(() => result),
                      Some: go,
                    })
                  )
              )
        )
    );

  return go(initialState);
}
export namespace retrying {
  export type Options<Value, Error> = {
    policy: RetryPolicy;
    initialState?: RetryState;
    check: (result: Result<Value, Error>) => Task<RetryResult, never>;
  };
}

function andThenResult<Value, ValueTo, Error>(
  task: Task<Value, Error>,
  thenResultFn: (result: Result<Value, Error>) => Task<ValueTo, Error>
) {
  return pipe(task).to(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    (_) => Task.andThen(_, (value) => thenResultFn(Result.Ok(value))),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    (_) => Task.orElse(_, (error) => thenResultFn(Result.Error(error)))
  );
}
