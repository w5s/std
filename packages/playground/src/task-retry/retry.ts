import type { Option, Int, Result } from '@w5s/core';
import type { Task, TaskLike } from '@w5s/task';
import { Error } from '@w5s/core/dist/Result/Error.js';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { map as taskMap } from '@w5s/task/dist/Task/map.js';
import { andThen as taskThen } from '@w5s/task/dist/Task/andThen.js';
import { orElse as taskElse } from '@w5s/task/dist/Task/orElse.js';
import { andRun as taskThenRun } from '@w5s/task/dist/Task/andRun.js';
import { all as taskAll } from '@w5s/task/dist/Task/all.js';
import { resolve as taskResolve } from '@w5s/task/dist/Task/resolve.js';
import { reject as taskReject } from '@w5s/task/dist/Task/reject.js';
import type { TimeDuration } from '@w5s/time';
import { delay as timeDelay } from '@w5s/time/dist/Time/delay.js';
import { from } from '@w5s/task/dist/Task/from.js';

const taskFromResult = <V, E>(result: Result<V, E>) =>
  result.ok ? taskResolve(result.value) : taskReject(result.error);
const defaultRandom = from<number, never>(({ resolve }) => resolve(Math.random()));
const resolveNone = taskResolve(undefined);

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
 * ```typescript
 * const retryState = new RetryState({
 *  retryIndex: Int(0),
 *  retryCumulativeDelay: TimeDuration({ seconds: 1 }),
 *  retryPreviousDelay: TimeDuration({ seconds: 1 }),
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
  retryPreviousDelay: undefined,
});

export interface RetryPolicy {
  (state: RetryState): Task<Option<TimeDuration>, never>;
}
export namespace RetryPolicy {
  /**
   * Map the policy delay using `mapFn(delay, state)`
   *
   * @example
   * ```typescript
   * const policy = RetryPolicy.wait(TimeDuration.of(2));
   * const mappedPolicy = RetryPolicy.map(policy, (delay) => TimeDuration.of(delay * 3));// Wait 6 seconds policy
   * ```
   * @param policy - The policy
   * @param thenFn - The map function
   */
  export function andThen(
    policy: RetryPolicy,
    thenFn: (delay: TimeDuration, state: RetryState) => Option<TimeDuration>,
  ): RetryPolicy {
    return (state) => taskMap(policy(state), (delayMs) => (delayMs == null ? undefined : thenFn(delayMs, state)));
  }

  /**
   * Filter the policy delay using `predicate(delay, state)`
   *
   * @example
   * ```typescript
   * const maxDelay = TimeDuration.of(4);
   * const policy = RetryPolicy.wait(TimeDuration.of(2));
   * const mappedPolicy = RetryPolicy.filter(policy, (delay, state) => state.cumulativeDelay > maxDelay);// Retry until cumulative delay is greater than 4 seconds
   * ```
   * @param policy - The policy
   * @param predicate - The predicate function
   */
  export function filter(
    policy: RetryPolicy,
    predicate: (delay: TimeDuration, state: RetryState) => boolean,
  ): RetryPolicy {
    return andThen(policy, (delay, state) => (predicate(delay, state) ? delay : undefined));
  }

  /**
   * Apply a retry policy to a retry state.
   *
   * @example
   * ```typescript
   * const policy = RetryPolicy.wait(TimeDuration.of(1));
   * const oldState = RetryState({ retryIndex: Int(0), retryCumulativeDelay: TimeDuration.of(1), retryPreviousDelay: Option.None });
   * const newState = RetryPolicy.apply(policy, retryState);
   * Task.run(newState) // Result.Ok(RetryState({ retryIndex: Int(1), retryCumulativeDelay: 1, retryPreviousDelay: 1 }))
   * ```
   * @param policy - The policy to apply
   * @param state - The current state of the retry operation
   */
  export function apply(policy: RetryPolicy, state: RetryState): Task<Option<RetryState>, never> {
    return taskMap(policy(state), (retryPreviousDelay) =>
      retryPreviousDelay == null
        ? retryPreviousDelay
        : RetryState({
            retryIndex: (+state.retryIndex + 1) as Int,
            retryCumulativeDelay: (+state.retryCumulativeDelay + +retryPreviousDelay) as TimeDuration,
            retryPreviousDelay,
          }),
    );
  }

  /**
   * Apply a retry policy to a retry state and wait `state.retryPreviousDelay` milliseconds.
   *
   * @example
   * ```typescript
   * const policy = RetryPolicy.wait(TimeDuration.of(1));
   * const oldState = RetryState({ retryIndex: Int(0), retryCumulativeDelay: TimeDuration.of(1), retryPreviousDelay: Option.None });
   * const newState = RetryPolicy.applyAndDelay(policy, retryState);
   * await Task.run(newState) // Result.Ok(RetryState({ retryIndex: Int(1), retryCumulativeDelay: 1, retryPreviousDelay: 1 }))
   * ```
   * @param policy - The policy to apply
   * @param state - The current state of the retry operation
   */
  export function applyAndDelay(policy: RetryPolicy, state: RetryState): Task<Option<RetryState>, never> {
    return taskThenRun(apply(policy, state), (nextStatus) =>
      timeDelay(nextStatus?.retryPreviousDelay ?? (0 as TimeDuration)),
    );
  }

  /**
   * Combines two policies into one. This policy will return :
   * - `Option.None`, if one of the policies returns `Option.None`.
   * - `Option.Some(max(leftDelay, rightDelay))`, else
   *
   * @example
   * ```typescript
   * const retryWait1ms = RetryPolicy.wait(TimeDuration.of(1));
   * const retryLimit3 = RetryPolicy.limitRetries(3);
   * const retryWait1msAndLimit3 = RetryPolicy.append(retryWait1ms, retryLimit3);
   * ```
   * @param left - The left policy
   * @param right - The right policy
   */
  export function append(left: RetryPolicy, right: RetryPolicy): RetryPolicy {
    return (state: RetryState) => {
      const allTask = taskAll([left(state), right(state)]);
      return taskMap(allTask, ([leftResult, rightResult]) =>
        leftResult == null || rightResult == null ? undefined : (Math.max(+leftResult, +rightResult) as TimeDuration),
      );
    };
  }

  /**
   * A retry policy that never retries
   *
   * @example
   * ```typescript
   * const policy: RetryPolicy = ...;
   * const policyDisabled = someCondition ? policy : RetryPolicy.never;
   * ```
   */
  export const never: RetryPolicy = function never(_state) {
    return resolveNone;
  };

  /**
   * A retry policy with a constant delay and unlimited retries.
   *
   * @category Constructor
   * @example
   * ```typescript
   * const policy = RetryPolicy.wait(TimeDuration.of(1)); // 1ms, 1ms, 1ms, 1ms, ...
   * ```
   * @param delay - The waiting delay between two attempts
   */
  export function wait(delay: TimeDuration): RetryPolicy {
    return (_state) => taskResolve(delay);
  }

  /**
   * Grow delay exponentially each iteration.
   * Each delay will increase by a factor of two.
   *
   * @category Constructor
   * @example
   * ```typescript
   * const policy = RetryPolicy.waitExponential(TimeDuration.of(1)); // 1ms, 2ms, 4ms, 8ms, ...
   * ```
   * @param initialDelay - The initial delay
   */
  export function waitExponential(initialDelay: TimeDuration): RetryPolicy {
    return ({ retryIndex }) => taskResolve((initialDelay * 2 ** retryIndex) as TimeDuration);
  }

  /**
   * FullJitter exponential delay as explained in AWS Architecture
   * temp = min(cap, initialDelay * 2 ** attempt)
   * sleep = temp / 2 + random_between(0, temp / 2)
   *
   * @see https://aws.amazon.com/fr/blogs/architecture/exponential-backoff-and-jitter/
   * @category Constructor
   * @example
   * ```typescript
   * const policy = RetryPolicy.waitFullJitter(TimeDuration.of(1)); // 0ms, 1 + rand(0, 1) ms, 2 + rand(0, 2)ms, ...
   * ```
   * @param initialDelay - The initial delay
   * @param generator - The random generator
   */
  export function waitExponentialJitter(initialDelay: TimeDuration, generator = defaultRandom): RetryPolicy {
    return ({ retryIndex }) => {
      const temporary = Math.trunc((initialDelay * 2 ** retryIndex) / 2) as Int;
      return taskMap(generator, (randomValue) => (+temporary + Math.trunc(randomValue * temporary)) as TimeDuration);
    };
  }

  /**
   * A retry policy that retries immediately, but only up to `count` times.
   *
   * @example
   * ```typescript
   * const policy = RetryPolicy.retries(Int(3));// Retry 3 times
   * ```
   * @category Constructor
   * @param count - The number of retries to allow
   */
  export function retries(count: Int): RetryPolicy {
    return ({ retryIndex }) => taskResolve(retryIndex >= count ? undefined : (0 as TimeDuration));
  }

  /**
   * Set a time upper bound for any delays that may be directed by the given policy.
   *
   * @example
   * ```typescript
   * const wait1_2_3ms: RetryPolicy; // Wait 1ms, 2ms, 3ms
   * const policy = RetryPolicy.waitMax(wait1_2_3ms, TimeDuration.of(2));// Wait 1ms, 2ms, 2ms
   * ```
   * @param policy - The policy to limit
   * @param maxDelay - The maximum delay between two attempts
   */
  export function waitMax(policy: RetryPolicy, maxDelay: TimeDuration): RetryPolicy {
    return andThen(policy, (delay) => Math.min(maxDelay, delay) as TimeDuration);
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
 * When `{ done: false, value: Option.Some(TimeDuration.of(...)) }` is returned, the retry operation will be done using given delay.
 */
export type RetryResult = RetryDoneResult | RetryContinueResult;

export function retry<Value, Error>(
  taskOrGetter: TaskLike<Value, Error> | ((state: RetryState) => TaskLike<Value, Error>),
  options: retry.Options<Value, Error>,
): Task<Value, Error> {
  const { policy, check, initialState = defaultRetryState } = options;
  const go = (state: RetryState): Task<Value, Error> =>
    andThenResult(typeof taskOrGetter === 'function' ? taskOrGetter(state) : taskOrGetter, (result) =>
      taskThen(check(result), (retryResult) =>
        retryResult.done === true
          ? taskFromResult(result)
          : (() => {
              const policyTask =
                retryResult.value == null ? policy : RetryPolicy.andThen(policy, () => retryResult.value);
              const applyTask = RetryPolicy.applyAndDelay(policyTask, state);
              const continueTask = taskThen(applyTask, (appliedStatus) =>
                appliedStatus == null ? taskFromResult(result) : go(appliedStatus),
              );
              return continueTask;
            })(),
      ),
    );

  return go(initialState);
}
export namespace retry {
  export type Options<Value, Error> = {
    policy: RetryPolicy;
    initialState?: RetryState;
    check: (result: Result<Value, Error>) => Task<RetryResult, never>;
  };
}

function andThenResult<Value, ValueTo, Error>(
  task: TaskLike<Value, Error>,
  thenResultFn: (result: Result<Value, Error>) => TaskLike<ValueTo, Error>,
) {
  const thenTask = taskThen(task, (value) => thenResultFn(Ok(value)));
  const elseTask = taskElse(thenTask, (error) => thenResultFn(Error(error)));
  return elseTask;
}
