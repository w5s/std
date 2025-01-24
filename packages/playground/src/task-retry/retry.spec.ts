import { Int, Option, Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { TimeDuration } from '@w5s/time';
import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { defaultRetryState, RetryPolicy, RetryState } from './retry.js';

const expectTask = withTask(expect);

describe('RetryState', () => {
  it('should return a new state', () => {
    expect(
      RetryState({
        retryIndex: Int(1),
        retryCumulativeDelay: TimeDuration.of(2),
        retryPreviousDelay: TimeDuration.of(3),
      }),
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
    retryIndex: Int(1),
    retryCumulativeDelay: TimeDuration.of(2),
    retryPreviousDelay: TimeDuration.of(3),
  });
  const anyDuration = TimeDuration.of(123);
  const generateDelays = (policy: RetryPolicy, limit: number) => {
    let currentState: Option<RetryState> = defaultRetryState;
    const values = [];
    const unsafeState = (task: Task<Option<RetryState>, never>): Option<RetryState> =>
      // @ts-ignore - we suppose it sync
      Result.get(Task.unsafeRun(task));
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
      expectTask(RetryPolicy.wait(anyDuration)(anyState)).toResolveSync(anyDuration);
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
      const generator = Task.resolve(rand);
      expect(generateDelays(RetryPolicy.waitExponentialJitter(base, generator), 5)).toEqual(expected);
    });
  });

  describe('.retries', () => {
    const policy = RetryPolicy.retries(Int(2));

    it('should return Option.Some(0), if retryIndex < count', () => {
      expectTask(
        policy(
          RetryState({
            retryIndex: Int(0),
          }),
        ),
      ).toResolveSync(0);
      expectTask(
        policy(
          RetryState({
            retryIndex: Int(1),
          }),
        ),
      ).toResolveSync(0);
    });
    it('should return Option.None if retryIndex < count', () => {
      expectTask(
        policy(
          RetryState({
            retryIndex: Int(2),
          }),
        ),
      ).toResolveSync(Option.None);
      expectTask(
        policy(
          RetryState({
            retryIndex: Int(3),
          }),
        ),
      ).toResolveSync(Option.None);
    });
  });

  describe('.never', () => {
    it('should always return None', () => {
      expectTask(RetryPolicy.never(anyState)).toResolveSync(Option.None);
    });
  });

  describe('.andThen', () => {
    it('should not call callback when Option.None', () => {
      const mappedPolicy = RetryPolicy.andThen(RetryPolicy.never, () => Option.Some(anyDuration));
      expectTask(mappedPolicy(anyState)).toResolveSync(Option.None);
    });
    it('should call callback(delay, state) when Option.Some', () => {
      const thenFn = vi.fn(() => Option.Some(TimeDuration.of(6)));
      const mappedPolicy = RetryPolicy.andThen(RetryPolicy.wait(anyDuration), thenFn);
      expectTask(mappedPolicy(anyState)).toResolveSync(Option.Some(6));
      expect(thenFn).toHaveBeenCalledWith(anyDuration, anyState);
    });
  });

  describe('.apply', () => {
    it('should None when policy returns None', () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.None);
      expectTask(RetryPolicy.apply(policy, anyState)).toResolveSync(Option.None);
    });
    it('should return a new state', () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.Some(TimeDuration.of(1)));
      const state = RetryState({
        retryIndex: Int(1),
        retryCumulativeDelay: TimeDuration.of(2),
        retryPreviousDelay: TimeDuration.of(3),
      });
      expectTask(RetryPolicy.apply(policy, state)).toResolveSync(
        RetryState({
          retryIndex: Int(2),
          retryCumulativeDelay: TimeDuration.of(3),
          retryPreviousDelay: TimeDuration.of(1),
        }),
      );
    });
  });

  describe('.applyAndDelay', () => {
    it('should None when policy returns None', async () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.None);
      await expectTask(RetryPolicy.applyAndDelay(policy, anyState)).toResolveAsync(Option.None);
    });
    it('should return a new state', async () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.Some(TimeDuration.of(1)));
      const state = RetryState({
        retryIndex: Int(1),
        retryCumulativeDelay: TimeDuration.of(2),
        retryPreviousDelay: TimeDuration.of(3),
      });
      await expectTask(RetryPolicy.applyAndDelay(policy, state)).toResolveAsync(
        RetryState({
          retryIndex: Int(2),
          retryCumulativeDelay: TimeDuration.of(3),
          retryPreviousDelay: TimeDuration.of(1),
        }),
      );
    });
  });

  describe('.append', () => {
    it('should return None if left returns None', () => {
      const left = RetryPolicy.never;
      const right = RetryPolicy.wait(anyDuration);
      expectTask(RetryPolicy.append(left, right)(anyState)).toResolveSync(Option.None);
    });
    it('should return None if right returns None', () => {
      const left = RetryPolicy.wait(anyDuration);
      const right = RetryPolicy.never;
      expectTask(RetryPolicy.append(left, right)(anyState)).toResolveSync(Option.None);
    });
    it('should return max of delay', () => {
      const lower = RetryPolicy.wait(TimeDuration.of(1));
      const higher = RetryPolicy.wait(TimeDuration.of(2));
      expectTask(RetryPolicy.append(lower, higher)(anyState)).toResolveSync(TimeDuration.of(2));
      expectTask(RetryPolicy.append(higher, lower)(anyState)).toResolveSync(TimeDuration.of(2));
    });
  });
  describe('.waitMax', () => {
    it('should always return None', () => {
      const limit = anyDuration;
      const overDelayPolicy = RetryPolicy.wait(TimeDuration.of(+limit + 1));
      expectTask(RetryPolicy.waitMax(overDelayPolicy, limit)(anyState)).toResolveSync(limit);
      const validPolicy = RetryPolicy.wait(TimeDuration.of(limit - 1));
      expectTask(RetryPolicy.waitMax(validPolicy, limit)(anyState)).toResolveSync(limit - 1);
    });
  });
  describe('.filter', () => {
    it('should not call callback when Option.None', () => {
      const mappedPolicy = RetryPolicy.filter(RetryPolicy.never, () => true);
      expectTask(mappedPolicy(anyState)).toResolveSync(Option.None);
    });
    it('should call callback(delay, state) when Option.Some', () => {
      const filterFn = vi.fn(() => false);
      const mappedPolicy = RetryPolicy.filter(RetryPolicy.wait(anyDuration), filterFn);
      expectTask(mappedPolicy(anyState)).toResolveSync(Option.None);
      expect(filterFn).toHaveBeenCalledWith(anyDuration, anyState);
    });
  });
});
