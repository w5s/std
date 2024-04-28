import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Option, Ref, Result, unsafeRun } from '@w5s/core';
import { describeCodec, describeComparable, describeType } from '@w5s/core/dist/testing.js';
import { DecodeError } from '@w5s/core/dist/Codec.js';
import { Time } from './Time.js';
import { TimeDuration } from './TimeDuration.js';

describe('Time', () => {
  vi.useFakeTimers();
  const anyDuration = TimeDuration.seconds(12);
  const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
  const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
  const dateNowSpy = vi.spyOn(Date, 'now');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('.of()', () => {
    it('should throw invariant error', () => {
      expect(() => Time.of(-1)).toThrow('Invalid Time');
      expect(() => Time.of(Number.NaN)).toThrow('Invalid Time');
    });
    it('should return unchanged value when positive', () => {
      expect(Time.of(1)).toBe(1);
    });
  });
  describe('.add', () => {
    it('should return difference between two times', () => {
      expect(Time.add(Time.of(1), TimeDuration.of(3))).toBe(4);
    });
  });
  describe('.diff', () => {
    it('should return difference between two times', () => {
      expect(Time.diff(Time.of(1), Time.of(3))).toBe(-2);
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
      expect(Time.toISOString(Time.of(0))).toBe('1970-01-01T00:00:00.000Z');
      expect(Time.toISOString(Time.of(1_622_120_111_480))).toBe('2021-05-27T12:55:11.480Z');
    });
  });
  describe('now()', () => {
    it('should return Date.now()', async () => {
      const nowMs = 123;
      dateNowSpy.mockReturnValue(nowMs);
      expect(unsafeRun(Time.now())).toEqual(Result.Ok(nowMs));
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
      const task = Time.delay(TimeDuration.of(delay));
      const promise = unsafeRun(task);
      expect(setTimeoutSpy).not.toHaveBeenCalled();
      vi.runAllTimers();
      await expect(promise).resolves.toEqual(Result.Ok(now));
    });
    it('should be cancelable', () => {
      const duration = TimeDuration.seconds(1);
      const task = Time.delay(duration);

      const canceler = Ref(() => {});
      const resolve = vi.fn();
      const reject = vi.fn();
      const run = vi.fn();

      // Run task
      task.taskRun({ resolve, reject, canceler, run });
      // Memorize the last setTimeout call
      // eslint-disable-next-line unicorn/prefer-at
      const setTimeoutResult = setTimeoutSpy.mock.results[setTimeoutSpy.mock.results.length - 1]?.value;

      // Trigger cancellation
      Ref.read(canceler)();

      vi.runAllTimers();

      expect(resolve).not.toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();
      expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
      expect(clearTimeoutSpy).toHaveBeenLastCalledWith(setTimeoutResult);
    });
  });
  describeType({ describe, it, expect })(Time, {
    typeName: 'Time',
    instances: () => [Time.of(0), Time.of(1)],
    notInstances: () => [null, undefined, [], Number.NaN],
  });
  describeCodec({ describe, it, expect })(Time, {
    encode: [
      [Time(1), 1],
      [Time(0), 0],
    ],
    decode: [
      [0, Result.Ok(Time(0))],
      [
        null,
        Result.Error(
          DecodeError({
            message: 'Cannot decode null as Time',
            input: null,
          })
        ),
      ],
    ],
    schema: () => ({
      type: 'number',
    }),
  });
  describeComparable({ describe, it, expect })(Time, {
    ordered: () => [Time.of(0), Time.of(1), Time.of(2)],
    equivalent: () => [
      [Time.of(0), Time.of(0)],
      [Time.of(1), Time.of(1)],
      [Time.of(1.1), Time.of(1.1)],
    ],
  });
});
