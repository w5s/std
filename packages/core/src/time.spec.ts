import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Option } from './option.js';
import { Ref } from './ref.js';
import { Result } from './result.js';
import { unsafeRun } from './run.js';
import { TimeDuration, Time } from './time.js';

describe('Time', () => {
  vi.useFakeTimers();
  const anyDuration = TimeDuration.seconds(12);
  const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
  const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
  const dateNowSpy = vi.spyOn(Date, 'now');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe.each([Time, Time.of])('()', (create) => {
    it('should throw invariant error', () => {
      expect(() => create(-1)).toThrow('-1 is not a valid time value');
      expect(() => create(Number.NaN)).toThrow('NaN is not a valid time value');
    });
    it('should return unchanged value when positive', () => {
      expect(create(1)).toBe(1);
    });
  });
  describe('.hasInstance', () => {
    it('should return true for valid values', () => {
      expect(Time.hasInstance(Time(1))).toBe(true);
    });
    it('should return false for invalid values', () => {
      expect(Time.hasInstance(null)).toBe(false);
      expect(Time.hasInstance(undefined)).toBe(false);
      expect(Time.hasInstance([])).toBe(false);
      expect(Time.hasInstance(-1)).toBe(false);
      expect(Time.hasInstance(Number.NaN)).toBe(false);
    });
  });
  describe('.add', () => {
    it('should return difference between two times', () => {
      expect(Time.add(Time(1), TimeDuration(3))).toBe(4);
    });
  });
  describe('.diff', () => {
    it('should return difference between two times', () => {
      expect(Time.diff(Time(1), Time(3))).toBe(-2);
    });
  });
  describe('.parseISOString', () => {
    it('should return None for invalid representations', () => {
      expect(Time.parseISOString('abc')).toBe(Option.None);
      expect(Time.parseISOString('')).toBe(Option.None);
    });
    it('should parse valid string ISO', () => {
      expect(Time.parseISOString('1970-01-01T00:00:00.000Z')).toBe(0);
      expect(Time.parseISOString('2021-05-27T12:55:11.480Z')).toBe(1_622_120_111_480);
    });
  });
  describe('.toISOString', () => {
    it('should return a valid string ISO representation', () => {
      expect(Time.toISOString(Time(0))).toBe('1970-01-01T00:00:00.000Z');
      expect(Time.toISOString(Time(1_622_120_111_480))).toBe('2021-05-27T12:55:11.480Z');
    });
  });
  describe('now', () => {
    it('should return Date.now()', async () => {
      const nowMs = 123;
      dateNowSpy.mockReturnValue(nowMs);
      expect(unsafeRun(Time.now)).toEqual(Result.Ok(nowMs));
    });
  });
  describe('.delay', () => {
    it('should return a task that resolves after duration', async () => {
      const now = Date.now();
      const task = Time.delay(anyDuration);
      expect(setTimeoutSpy).toHaveBeenCalledTimes(0);

      const promise = unsafeRun(task);
      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
      expect(setTimeoutSpy).toHaveBeenLastCalledWith(expect.any(Function), anyDuration);
      vi.runAllTimers();
      await expect(promise).resolves.toEqual(Result.Ok(now));
    });
    it.each([0, -1])('should not setTimeout if delay <= 0', async (delay) => {
      const now = Date.now();
      const task = Time.delay(TimeDuration(delay));
      const promise = unsafeRun(task);
      expect(setTimeoutSpy).not.toHaveBeenCalled();
      vi.runAllTimers();
      await expect(promise).resolves.toEqual(Result.Ok(now));
    });
    it('should be cancelable', () => {
      const duration = TimeDuration.seconds(1);
      const task = Time.delay(duration);

      const cancelerRef = Ref(() => {});
      const resolve = vi.fn();
      const reject = vi.fn();

      // Run task
      task.taskRun(resolve, reject, cancelerRef);
      // Memorize the last setTimeout call
      // eslint-disable-next-line unicorn/prefer-at
      const setTimeoutResult = setTimeoutSpy.mock.results[setTimeoutSpy.mock.results.length - 1]?.value;

      // Trigger cancellation
      Ref.read(cancelerRef)();

      vi.runAllTimers();

      expect(resolve).not.toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();
      expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
      expect(clearTimeoutSpy).toHaveBeenLastCalledWith(setTimeoutResult);
    });
  });
});
describe('TimeDuration', () => {
  describe.each([TimeDuration, TimeDuration.of])('()', (create) => {
    it('should throw invariant error', () => {
      expect(() => create(Number.NaN)).toThrow('NaN is not a valid duration value');
    });
    it.each([
      [1, 1],
      [-1, -1],
      [1.1, 1.1],
    ])('should return an int value', (input, expected) => {
      expect(create(input)).toBe(expected);
    });
  });
  describe('.hasInstance', () => {
    it('should return true for valid values', () => {
      expect(TimeDuration.hasInstance(1)).toBe(true);
      expect(TimeDuration.hasInstance(-1)).toBe(true);
    });
    it('should return false for invalid values', () => {
      expect(TimeDuration.hasInstance(null)).toBe(false);
      expect(TimeDuration.hasInstance(undefined)).toBe(false);
      expect(TimeDuration.hasInstance([])).toBe(false);
      expect(TimeDuration.hasInstance(Number.NaN)).toBe(false);
    });
  });
  describe('.milliseconds', () => {
    it('should return an int value', () => {
      expect(TimeDuration.milliseconds(1)).toBe(1);
    });
  });
  describe('.seconds', () => {
    it('should return an int value', () => {
      expect(TimeDuration.seconds(1)).toBe(1000);
    });
  });
  describe('.minutes', () => {
    it('should return an int value', () => {
      expect(TimeDuration.minutes(1)).toBe(1000 * 60);
    });
  });
  describe('.hours', () => {
    it('should return an int value', () => {
      expect(TimeDuration.hours(1)).toBe(1000 * 60 * 60);
    });
  });
  describe('.days', () => {
    it('should return an int value', () => {
      expect(TimeDuration.days(1)).toBe(1000 * 60 * 60 * 24);
    });
  });
});
