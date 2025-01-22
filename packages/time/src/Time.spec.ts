import { describe, it, expect } from 'vitest';
import { Time } from './Time.js';
import { TimeDuration } from './TimeDuration.js';
import { TimeComparable } from './Time/TimeComparable.js';
import { delay } from './Time/delay.js';
import { now } from './Time/now.js';
import { parse } from './Time/parse.js';
import { format } from './Time/format.js';
import { from } from './Time/from.js';
import { TimeBounded } from './Time/TimeBounded.js';

describe('Time', () => {
  it('is an alias to functions', () => {
    expect(Time).toEqual(expect.objectContaining(TimeComparable));
    expect(Time).toEqual(expect.objectContaining(TimeBounded));
    expect(Time).toEqual(
      expect.objectContaining({
        delay,
        now,
        parse,
        format,
        from,
      }),
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
});
