import { Int, Option, pipe, Result, Task, Time, TimeDuration } from '@w5s/core';

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
   * Apply a retry policy to a retry state. If the policy returns a `Option.None`
   *
   * @example
   * ```ts
   * const policy = RetryPolicy.wait(TimeDuration.milliseconds(1));
   * const oldState = RetryState({ retryIndex: Int(0), retryCumulativeDelay: TimeDuration(1), retryPreviousDelay: Option.None });
   * const newState = RetryPolicy.apply(policy, retryState);
   * // newState = RetryState({ retryIndex: Int(1), retryCumulativeDelay: 1, retryPreviousDelay: 1 })
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
   * Combines two policies into one. This policy will return :
   * - `Option.None`, if one of the policies returns `Option.None`.
   * - `Option.Some(max(leftDelay, rightDelay))`, else
   *
   * @example
   * ```ts
   * const retryWait1ms = RetryPolicy.wait(TimeDuration.milliseconds(1));
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
  export const never: RetryPolicy = (_state) => Task.resolve(Option.None);

  /**
   * A retry policy with a constant delay and unlimited retries.
   *
   * @category Constructor
   * @example
   * ```ts
   * const delay = TimeDuration.milliseconds(1);
   * const policy = RetryPolicy.wait(delay); // 1ms, 1ms, 1ms, 1ms, ...
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
   * const initialDelay = TimeDuration.milliseconds(1);
   * const policy = RetryPolicy.waitExponential(initialDelay); // 1ms, 2ms, 4ms, 8ms, ...
   * ```
   * @param initialDelay - The initial delay
   */
  export function waitExponential(initialDelay: TimeDuration): RetryPolicy {
    return (status) => Task.resolve(Option.Some((initialDelay * 2 ** status.retryIndex) as TimeDuration));
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

export function waitForNextRetryState(policy: RetryPolicy, state: RetryState): Task<Option<RetryState>, never> {
  return Task.andThen(RetryPolicy.apply(policy, state), (nextStatus) =>
    Option.isNone(nextStatus) || Option.isNone(nextStatus.retryPreviousDelay)
      ? Task.resolve(nextStatus)
      : Task.map(Time.delay(nextStatus.retryPreviousDelay), () => nextStatus)
  );
}

export function retrying<Value, Error>(
  action: Task<Value, Error> | ((state: RetryState) => Task<Value, Error>),
  options: retrying.Options<Value, Error>
): Task<Value, Error> {
  const { policy, check, initialState = defaultRetryState } = options;
  const go = (state: RetryState): Task<Value, Error> =>
    pipe(typeof action === 'function' ? action(state) : action).to(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      (_) => Task.andThen(_, (value) => handleResult(state, Result.Ok(value))),
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      (_) => Task.orElse(_, (error) => handleResult(state, Result.Error(error)))
    );
  const handleResult = (state: RetryState, result: Result<Value, Error>) =>
    Task.andThen(check(result), (shouldRetry) =>
      shouldRetry
        ? Task.andThen(waitForNextRetryState(policy, state), (appliedStatus) =>
            Option.isNone(appliedStatus) ? Task(() => result) : go(appliedStatus)
          )
        : Task(() => result)
    );

  return go(initialState);
}
export namespace retrying {
  export type Options<Value, Error> = {
    policy: RetryPolicy;
    initialState?: RetryState;
    check: (result: Result<Value, Error>) => Task<boolean, never>;
    // action: (state: RetryState) => Task<Value, Error>;
  };
}
