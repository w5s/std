import { Int, Option, Task, Result, unsafeRun } from '@w5s/core';
import { TimeDuration } from '@w5s/time';
import { RandomGenerator, RandomValue } from '@w5s/random';
import { describe, it, expect, vi } from 'vitest';
import { defaultRetryState, RetryPolicy, RetryState } from './retry.js';

describe('RetryState', () => {
  it('should return a new state', () => {
    expect(
      RetryState({
        retryIndex: Int.of(1),
        retryCumulativeDelay: TimeDuration.of(2),
        retryPreviousDelay: TimeDuration.of(3),
      })
    ).toEqual({
      retryIndex: 1,
      retryCumulativeDelay: 2,
      retryPreviousDelay: 3,
    });
  });
  it('should use default values', () => {
    expect(RetryState({})).toEqual({
      retryIndex: 0,
      retryCumulativeDelay: 0,
      retryPreviousDelay: Option.None,
    });
  });
});
describe('defaultRetryState', () => {
  it('should have all values to 0', () => {
    expect(defaultRetryState).toEqual({
      retryIndex: 0,
      retryCumulativeDelay: 0,
      retryPreviousDelay: Option.None,
    });
  });
});
describe('RetryPolicy', () => {
  const anyState = RetryState({
    retryIndex: Int.of(1),
    retryCumulativeDelay: TimeDuration.of(2),
    retryPreviousDelay: TimeDuration.of(3),
  });
  const anyDuration = TimeDuration.of(123);
  const unsafeRunOk = <V>(task: Task<V, never>): V | Promise<V> => {
    const promiseOrValue = unsafeRun(task);
    // @ts-ignore - we know this is a promise
    // eslint-disable-next-line promise/prefer-await-to-then
    return typeof promiseOrValue.then === 'function' ? promiseOrValue.then(Result.value) : Result.value(promiseOrValue);
  };
  const generateDelays = (policy: RetryPolicy, limit: number) => {
    let currentState: Option<RetryState> = defaultRetryState;
    const values = [];
    const unsafeState = (task: Task<Option<RetryState>, never>): Option<RetryState> =>
      // @ts-ignore - we suppose it sync
      Result.value(unsafeRun(task));
    for (let index = 0; index < limit; index += 1) {
      if (Option.isNone(currentState)) {
        break;
      }
      currentState = unsafeState(RetryPolicy.apply(policy, currentState));
      values.push(currentState?.retryPreviousDelay);
    }
    return values;
  };

  describe('.wait', () => {
    it('should return a constant delay', () => {
      expect(unsafeRunOk(RetryPolicy.wait(anyDuration)(anyState))).toEqual(anyDuration);
    });
  });

  describe('.waitExponential', () => {
    it('should return an exponential evolution of values', () => {
      expect(generateDelays(RetryPolicy.waitExponential(TimeDuration.of(1)), 5)).toEqual([1, 2, 4, 8, 16]);
    });
  });

  describe('.waitExponentialJitter', () => {
    it.each([
      [TimeDuration.of(1), 0, [0, 1, 2, 4, 8]],
      [TimeDuration.of(1), 0.5, [0, 1, 3, 6, 12]],
      [TimeDuration.of(1), 1, [0, 2, 4, 8, 16]],
      [TimeDuration.of(2), 0, [1, 2, 4, 8, 16]],
      [TimeDuration.of(2), 0.5, [1, 3, 6, 12, 24]],
      [TimeDuration.of(3), 1, [2, 6, 12, 24, 48]],
    ])('should return a custom value evolution with random', (base, rand, expected) => {
      const generator = RandomGenerator(() => rand as RandomValue);
      expect(generateDelays(RetryPolicy.waitExponentialJitter(base, generator), 5)).toEqual(expected);
    });
  });

  describe('.retries', () => {
    const policy = RetryPolicy.retries(Int.of(2));

    it('should return Option.Some(0), if retryIndex < count', () => {
      expect(
        unsafeRunOk(
          policy(
            RetryState({
              retryIndex: Int.of(0),
            })
          )
        )
      ).toEqual(0);
      expect(
        unsafeRunOk(
          policy(
            RetryState({
              retryIndex: Int.of(1),
            })
          )
        )
      ).toEqual(0);
    });
    it('should return Option.None if retryIndex < count', () => {
      expect(
        unsafeRunOk(
          policy(
            RetryState({
              retryIndex: Int.of(2),
            })
          )
        )
      ).toEqual(Option.None);
      expect(
        unsafeRunOk(
          policy(
            RetryState({
              retryIndex: Int.of(3),
            })
          )
        )
      ).toEqual(Option.None);
    });
  });

  describe('.never', () => {
    it('should always return None', () => {
      expect(unsafeRunOk(RetryPolicy.never(anyState))).toEqual(Option.None);
    });
  });

  describe('.andThen', () => {
    it('should not call callback when Option.None', () => {
      const mappedPolicy = RetryPolicy.andThen(RetryPolicy.never, () => Option.Some(anyDuration));
      expect(unsafeRunOk(mappedPolicy(anyState))).toEqual(Option.None);
    });
    it('should call callback(delay, state) when Option.Some', () => {
      const thenFn = vi.fn(() => Option.Some(TimeDuration.of(6)));
      const mappedPolicy = RetryPolicy.andThen(RetryPolicy.wait(anyDuration), thenFn);
      expect(unsafeRunOk(mappedPolicy(anyState))).toEqual(Option.Some(6));
      expect(thenFn).toHaveBeenCalledWith(anyDuration, anyState);
    });
  });

  describe('.apply', () => {
    it('should None when policy returns None', () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.None);
      expect(unsafeRunOk(RetryPolicy.apply(policy, anyState))).toEqual(Option.None);
    });
    it('should return a new state', () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.Some(TimeDuration.of(1)));
      const state = RetryState({
        retryIndex: Int.of(1),
        retryCumulativeDelay: TimeDuration.of(2),
        retryPreviousDelay: TimeDuration.of(3),
      });
      expect(unsafeRunOk(RetryPolicy.apply(policy, state))).toEqual(
        RetryState({
          retryIndex: Int.of(2),
          retryCumulativeDelay: TimeDuration.of(3),
          retryPreviousDelay: TimeDuration.of(1),
        })
      );
    });
  });

  describe('.applyAndDelay', () => {
    it('should None when policy returns None', async () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.None);
      await expect(unsafeRunOk(RetryPolicy.applyAndDelay(policy, anyState))).resolves.toEqual(Option.None);
    });
    it('should return a new state', async () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.Some(TimeDuration.of(1)));
      const state = RetryState({
        retryIndex: Int.of(1),
        retryCumulativeDelay: TimeDuration.of(2),
        retryPreviousDelay: TimeDuration.of(3),
      });
      await expect(unsafeRunOk(RetryPolicy.applyAndDelay(policy, state))).resolves.toEqual(
        RetryState({
          retryIndex: Int.of(2),
          retryCumulativeDelay: TimeDuration.of(3),
          retryPreviousDelay: TimeDuration.of(1),
        })
      );
    });
  });

  describe('.append', () => {
    it('should return None if left returns None', () => {
      const left = RetryPolicy.never;
      const right = RetryPolicy.wait(anyDuration);
      expect(unsafeRunOk(RetryPolicy.append(left, right)(anyState))).toEqual(Option.None);
    });
    it('should return None if right returns None', () => {
      const left = RetryPolicy.wait(anyDuration);
      const right = RetryPolicy.never;
      expect(unsafeRunOk(RetryPolicy.append(left, right)(anyState))).toEqual(Option.None);
    });
    it('should return max of delay', () => {
      const lower = RetryPolicy.wait(TimeDuration.of(1));
      const higher = RetryPolicy.wait(TimeDuration.of(2));
      expect(unsafeRunOk(RetryPolicy.append(lower, higher)(anyState))).toEqual(TimeDuration.of(2));
      expect(unsafeRunOk(RetryPolicy.append(higher, lower)(anyState))).toEqual(TimeDuration.of(2));
    });
  });
  describe('.waitMax', () => {
    it('should always return None', () => {
      const limit = anyDuration;
      const overDelayPolicy = RetryPolicy.wait(TimeDuration.of(+limit + 1));
      expect(unsafeRunOk(RetryPolicy.waitMax(overDelayPolicy, limit)(anyState))).toEqual(limit);
      const validPolicy = RetryPolicy.wait(TimeDuration.of(limit - 1));
      expect(unsafeRunOk(RetryPolicy.waitMax(validPolicy, limit)(anyState))).toEqual(limit - 1);
    });
  });
  describe('.filter', () => {
    it('should not call callback when Option.None', () => {
      const mappedPolicy = RetryPolicy.filter(RetryPolicy.never, () => true);
      expect(unsafeRunOk(mappedPolicy(anyState))).toEqual(Option.None);
    });
    it('should call callback(delay, state) when Option.Some', () => {
      const filterFn = vi.fn(() => false);
      const mappedPolicy = RetryPolicy.filter(RetryPolicy.wait(anyDuration), filterFn);
      expect(unsafeRunOk(mappedPolicy(anyState))).toEqual(Option.None);
      expect(filterFn).toHaveBeenCalledWith(anyDuration, anyState);
    });
  });
});
