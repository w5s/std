import { Option } from './option.js';
import { Ref } from './ref.js';
import { Result } from './result.js';
import { Task } from './task.js';
import { TimeDuration, Time } from './time.js';

describe(Time, () => {
  describe('()', () => {
    test('should throw invariant error', () => {
      expect(() => Time(-1)).toThrow('-1 is not a valid time value');
      expect(() => Time(Number.NaN)).toThrow('NaN is not a valid time value');
    });
    test('should return unchanged value when positive', () => {
      expect(Time(1)).toBe(1);
    });
  });
  describe(Time.hasInstance, () => {
    test('should return true for valid values', () => {
      expect(Time.hasInstance(Time(1))).toBe(true);
    });
    test('should return false for invalid values', () => {
      expect(Time.hasInstance(null)).toBe(false);
      expect(Time.hasInstance(undefined)).toBe(false);
      expect(Time.hasInstance([])).toBe(false);
      expect(Time.hasInstance(-1)).toBe(false);
      expect(Time.hasInstance(Number.NaN)).toBe(false);
    });
  });
  describe(Time.add, () => {
    test('should return difference between two times', () => {
      expect(Time.add(Time(1), TimeDuration(3))).toBe(4);
    });
  });
  describe(Time.diff, () => {
    test('should return difference between two times', () => {
      expect(Time.diff(Time(1), Time(3))).toBe(-2);
    });
  });
  describe(Time.parseISOString, () => {
    test('should return None for invalid representations', () => {
      expect(Time.parseISOString('abc')).toBe(Option.None);
      expect(Time.parseISOString('')).toBe(Option.None);
    });
    test('should parse valid string ISO', () => {
      expect(Time.parseISOString('1970-01-01T00:00:00.000Z')).toBe(0);
      expect(Time.parseISOString('2021-05-27T12:55:11.480Z')).toBe(1_622_120_111_480);
    });
  });
  describe(Time.toISOString, () => {
    test('should return a valid string ISO representation', () => {
      expect(Time.toISOString(Time(0))).toBe('1970-01-01T00:00:00.000Z');
      expect(Time.toISOString(Time(1_622_120_111_480))).toBe('2021-05-27T12:55:11.480Z');
    });
  });
  describe('now', () => {
    test('should return Date.now()', async () => {
      const nowMs = 123;
      jest.spyOn(Date, 'now').mockReturnValue(nowMs);
      expect(Task.unsafeRun(Time.now)).toEqual(Result.Ok(123));
    });
  });
  describe(Time.delay, () => {
    test('should return a task that resolves after duration', async () => {
      const fakeNow = 123;
      jest.useFakeTimers();
      jest.spyOn(globalThis, 'setTimeout');
      jest.spyOn(Date, 'now').mockReturnValue(fakeNow);
      const duration = TimeDuration.seconds(1);
      const task = Time.delay(duration);
      expect(setTimeout).toHaveBeenCalledTimes(0);

      const promise = Task.unsafeRun(task);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(Result.Ok(fakeNow));
    });
    test('should be cancelable', () => {
      const globalClearTimeout = jest.spyOn(globalThis, 'clearTimeout');
      const globalSetTimeout = jest.spyOn(globalThis, 'setTimeout');
      jest.useFakeTimers();

      const duration = TimeDuration.seconds(1);
      const task = Time.delay(duration);

      const cancelerRef = Ref(() => {});
      const resolve = jest.fn();
      const reject = jest.fn();

      // Run task
      task[Task.run](resolve, reject, cancelerRef);
      // Memorize the last setTimeout call
      const setTimeoutResult = globalSetTimeout.mock.results[globalSetTimeout.mock.results.length - 1]?.value;

      // Trigger cancellation
      Ref.read(cancelerRef)();

      jest.runAllTimers();

      expect(resolve).not.toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();
      expect(globalClearTimeout).toHaveBeenCalledTimes(1);
      expect(globalClearTimeout).toHaveBeenLastCalledWith(setTimeoutResult);
    });
  });
});
describe(TimeDuration, () => {
  describe('()', () => {
    test('should throw invariant error', () => {
      expect(() => TimeDuration(Number.NaN)).toThrow('NaN is not a valid duration value');
    });
    test.each([
      [1, 1],
      [-1, -1],
      [1.1, 1],
    ])('should return an int value', (input, expected) => {
      expect(TimeDuration(input)).toBe(expected);
    });
  });
  describe(TimeDuration.hasInstance, () => {
    test('should return true for valid values', () => {
      expect(TimeDuration.hasInstance(1)).toBe(true);
      expect(TimeDuration.hasInstance(-1)).toBe(true);
    });
    test('should return false for invalid values', () => {
      expect(TimeDuration.hasInstance(null)).toBe(false);
      expect(TimeDuration.hasInstance(undefined)).toBe(false);
      expect(TimeDuration.hasInstance([])).toBe(false);
      expect(TimeDuration.hasInstance(Number.NaN)).toBe(false);
    });
  });
  describe(TimeDuration.milliseconds, () => {
    test('should return an int value', () => {
      expect(TimeDuration.milliseconds(1)).toBe(1);
    });
  });
  describe(TimeDuration.seconds, () => {
    test('should return an int value', () => {
      expect(TimeDuration.seconds(1)).toBe(1000);
    });
  });
  describe(TimeDuration.minutes, () => {
    test('should return an int value', () => {
      expect(TimeDuration.minutes(1)).toBe(1000 * 60);
    });
  });
  describe(TimeDuration.hours, () => {
    test('should return an int value', () => {
      expect(TimeDuration.hours(1)).toBe(1000 * 60 * 60);
    });
  });
  describe(TimeDuration.days, () => {
    test('should return an int value', () => {
      expect(TimeDuration.days(1)).toBe(1000 * 60 * 60 * 24);
    });
  });
});
