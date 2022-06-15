import { TimeDuration, Int, Option, Task, Result, Random } from '@w5s/core';
import { defaultRetryState, RetryPolicy, RetryState } from './retry.js';

describe(RetryState, () => {
  test('should return a new state', () => {
    expect(
      RetryState({
        retryIndex: Int(1),
        retryCumulativeDelay: TimeDuration(2),
        retryPreviousDelay: TimeDuration(3),
      })
    ).toEqual({
      retryIndex: 1,
      retryCumulativeDelay: 2,
      retryPreviousDelay: 3,
    });
  });
  test('should use default values', () => {
    expect(RetryState({})).toEqual({
      retryIndex: 0,
      retryCumulativeDelay: 0,
      retryPreviousDelay: Option.None,
    });
  });
});
describe('defaultRetryState', () => {
  test('should have all values to 0', () => {
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
    retryCumulativeDelay: TimeDuration(2),
    retryPreviousDelay: TimeDuration(3),
  });
  const anyDuration = TimeDuration(123);
  const unsafeRunOk = <V>(task: Task<V, never>): V | Promise<V> => {
    const promiseOrValue = Task.unsafeRun(task);
    // @ts-ignore - we know this is a promise
    // eslint-disable-next-line promise/prefer-await-to-then
    return typeof promiseOrValue.then === 'function' ? promiseOrValue.then(Result.value) : Result.value(promiseOrValue);
  };
  const generateDelays = (policy: RetryPolicy, limit: number) => {
    let currentState: Option<RetryState> = defaultRetryState;
    const values = [];
    const unsafeState = (task: Task<Option<RetryState>, never>): Option<RetryState> =>
      // @ts-ignore - we suppose it sync
      Result.value(Task.unsafeRun(task));
    for (let index = 0; index < limit; index += 1) {
      if (Option.isNone(currentState)) {
        break;
      }
      currentState = unsafeState(RetryPolicy.apply(policy, currentState));
      values.push(currentState?.retryPreviousDelay);
    }
    return values;
  };

  describe(RetryPolicy.wait, () => {
    test('should return a constant delay', () => {
      expect(unsafeRunOk(RetryPolicy.wait(anyDuration)(anyState))).toEqual(anyDuration);
    });
  });

  describe(RetryPolicy.waitExponential, () => {
    test('should return an exponential evolution of values', () => {
      expect(generateDelays(RetryPolicy.waitExponential(TimeDuration(1)), 5)).toEqual([1, 2, 4, 8, 16]);
    });
  });

  describe(RetryPolicy.waitExponentialJitter, () => {
    test.each([
      [TimeDuration(1), 0, [0, 1, 2, 4, 8]],
      [TimeDuration(1), 0.5, [0, 1, 3, 6, 12]],
      [TimeDuration(1), 1, [0, 2, 4, 8, 16]],
      [TimeDuration(2), 0, [1, 2, 4, 8, 16]],
      [TimeDuration(2), 0.5, [1, 3, 6, 12, 24]],
      [TimeDuration(3), 1, [2, 6, 12, 24, 48]],
    ])('should return a custom value evolution with random', (base, rand, expected) => {
      const generator = Random.Generator(() => rand as Random.Value);
      expect(generateDelays(RetryPolicy.waitExponentialJitter(base, generator), 5)).toEqual(expected);
    });
  });

  describe(RetryPolicy.retries, () => {
    const policy = RetryPolicy.retries(Int(2));

    test('should return Option.Some(0), if retryIndex < count', () => {
      expect(
        unsafeRunOk(
          policy(
            RetryState({
              retryIndex: Int(0),
            })
          )
        )
      ).toEqual(0);
      expect(
        unsafeRunOk(
          policy(
            RetryState({
              retryIndex: Int(1),
            })
          )
        )
      ).toEqual(0);
    });
    test('should return Option.None if retryIndex < count', () => {
      expect(
        unsafeRunOk(
          policy(
            RetryState({
              retryIndex: Int(2),
            })
          )
        )
      ).toEqual(Option.None);
      expect(
        unsafeRunOk(
          policy(
            RetryState({
              retryIndex: Int(3),
            })
          )
        )
      ).toEqual(Option.None);
    });
  });

  describe(RetryPolicy.never, () => {
    test('should always return None', () => {
      expect(unsafeRunOk(RetryPolicy.never(anyState))).toEqual(Option.None);
    });
  });

  describe(RetryPolicy.andThen, () => {
    test('should not call callback when Option.None', () => {
      const mappedPolicy = RetryPolicy.andThen(RetryPolicy.never, () => Option.Some(anyDuration));
      expect(unsafeRunOk(mappedPolicy(anyState))).toEqual(Option.None);
    });
    test('should call callback(delay, state) when Option.Some', () => {
      const thenFn = jest.fn(() => Option.Some(TimeDuration(6)));
      const mappedPolicy = RetryPolicy.andThen(RetryPolicy.wait(anyDuration), thenFn);
      expect(unsafeRunOk(mappedPolicy(anyState))).toEqual(Option.Some(6));
      expect(thenFn).toHaveBeenCalledWith(anyDuration, anyState);
    });
  });

  describe(RetryPolicy.apply, () => {
    test('should None when policy returns None', () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.None);
      expect(unsafeRunOk(RetryPolicy.apply(policy, anyState))).toEqual(Option.None);
    });
    test('should return a new state', () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.Some(TimeDuration(1)));
      const state = RetryState({
        retryIndex: Int(1),
        retryCumulativeDelay: TimeDuration(2),
        retryPreviousDelay: TimeDuration(3),
      });
      expect(unsafeRunOk(RetryPolicy.apply(policy, state))).toEqual(
        RetryState({
          retryIndex: Int(2),
          retryCumulativeDelay: TimeDuration(3),
          retryPreviousDelay: TimeDuration(1),
        })
      );
    });
  });

  describe(RetryPolicy.applyAndDelay, () => {
    test('should None when policy returns None', async () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.None);
      await expect(unsafeRunOk(RetryPolicy.applyAndDelay(policy, anyState))).resolves.toEqual(Option.None);
    });
    test('should return a new state', async () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.Some(TimeDuration(1)));
      const state = RetryState({
        retryIndex: Int(1),
        retryCumulativeDelay: TimeDuration(2),
        retryPreviousDelay: TimeDuration(3),
      });
      await expect(unsafeRunOk(RetryPolicy.applyAndDelay(policy, state))).resolves.toEqual(
        RetryState({
          retryIndex: Int(2),
          retryCumulativeDelay: TimeDuration(3),
          retryPreviousDelay: TimeDuration(1),
        })
      );
    });
  });

  describe(RetryPolicy.append, () => {
    test('should return None if left returns None', () => {
      const left = RetryPolicy.never;
      const right = RetryPolicy.wait(anyDuration);
      expect(unsafeRunOk(RetryPolicy.append(left, right)(anyState))).toEqual(Option.None);
    });
    test('should return None if right returns None', () => {
      const left = RetryPolicy.wait(anyDuration);
      const right = RetryPolicy.never;
      expect(unsafeRunOk(RetryPolicy.append(left, right)(anyState))).toEqual(Option.None);
    });
    test('should return max of delay', () => {
      const lower = RetryPolicy.wait(TimeDuration(1));
      const higher = RetryPolicy.wait(TimeDuration(2));
      expect(unsafeRunOk(RetryPolicy.append(lower, higher)(anyState))).toEqual(TimeDuration(2));
      expect(unsafeRunOk(RetryPolicy.append(higher, lower)(anyState))).toEqual(TimeDuration(2));
    });
  });
  describe(RetryPolicy.waitMax, () => {
    test('should always return None', () => {
      const limit = anyDuration;
      const overDelayPolicy = RetryPolicy.wait(TimeDuration(+limit + 1));
      expect(unsafeRunOk(RetryPolicy.waitMax(overDelayPolicy, limit)(anyState))).toEqual(limit);
      const validPolicy = RetryPolicy.wait(TimeDuration(limit - 1));
      expect(unsafeRunOk(RetryPolicy.waitMax(validPolicy, limit)(anyState))).toEqual(limit - 1);
    });
  });
  describe(RetryPolicy.filter, () => {
    test('should not call callback when Option.None', () => {
      const mappedPolicy = RetryPolicy.filter(RetryPolicy.never, () => true);
      expect(unsafeRunOk(mappedPolicy(anyState))).toEqual(Option.None);
    });
    test('should call callback(delay, state) when Option.Some', () => {
      const filterFn = jest.fn(() => false);
      const mappedPolicy = RetryPolicy.filter(RetryPolicy.wait(anyDuration), filterFn);
      expect(unsafeRunOk(mappedPolicy(anyState))).toEqual(Option.None);
      expect(filterFn).toHaveBeenCalledWith(anyDuration, anyState);
    });
  });
});
