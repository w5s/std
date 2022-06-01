import { TimeDuration, Int, Option, Task, Result } from '@w5s/core';
import { defaultRetryState, RetryPolicy, RetryState } from './retry';

describe(RetryState, () => {
  test('should return a new state', () => {
    expect(
      RetryState({
        retryIndex: Int(1),
        retryCumulativeDelay: TimeDuration.milliseconds(2),
        retryPreviousDelay: TimeDuration.milliseconds(3),
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
    retryCumulativeDelay: TimeDuration.milliseconds(2),
    retryPreviousDelay: TimeDuration.milliseconds(3),
  });
  const anyDuration = TimeDuration(123);
  const unsafeRunOk = <V>(task: Task<V, never>): V | Promise<V> => {
    const promiseOrValue = Task.unsafeRun(task);
    // @ts-ignore - we know this is a promise
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
    test('should return a constant delay', () => {
      expect(generateDelays(RetryPolicy.waitExponential(TimeDuration(1)), 5)).toEqual([1, 2, 4, 8, 16]);
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

  describe(RetryPolicy.apply, () => {
    test('should None when policy returns None', () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.None);
      expect(unsafeRunOk(RetryPolicy.apply(policy, anyState))).toEqual(Option.None);
    });
    test('should return a new state', () => {
      const policy: RetryPolicy = (_state) => Task.resolve(Option.Some(TimeDuration.milliseconds(1)));
      const state = RetryState({
        retryIndex: Int(1),
        retryCumulativeDelay: TimeDuration.milliseconds(2),
        retryPreviousDelay: TimeDuration.milliseconds(3),
      });
      expect(unsafeRunOk(RetryPolicy.apply(policy, state))).toEqual(
        RetryState({
          retryIndex: Int(2),
          retryCumulativeDelay: TimeDuration.milliseconds(3),
          retryPreviousDelay: TimeDuration.milliseconds(1),
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
});
