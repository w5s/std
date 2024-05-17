import { describe, it, expect } from 'vitest';
import { Option } from '@w5s/core';
import { Time } from './Time.js';
import { TimeDuration } from './TimeDuration.js';
import { TimeComparable } from './Time/TimeComparable.js';
import { delay } from './Time/delay.js';
import { now } from './Time/now.js';

describe('Time', () => {
  it('is an alias to functions', () => {
    expect(Time).toEqual(expect.objectContaining(TimeComparable));
    expect(Time).toEqual(
      expect.objectContaining({
        delay,
        now,
      })
    );
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
});
