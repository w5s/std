import { describe, it, expect } from 'vitest';
import { Time } from './Time.js';
import { TimeComparable } from './Time/TimeComparable.js';
import { delay } from './Time/delay.js';
import { now } from './Time/now.js';
import { parse } from './Time/parse.js';
import { format } from './Time/format.js';
import { from } from './Time/from.js';
import { TimeBounded } from './Time/TimeBounded.js';
import { TimeNumeric } from './Time/TimeNumeric.js';

describe('Time', () => {
  it('is an alias to functions', () => {
    expect(Time).toEqual(expect.objectContaining(TimeComparable));
    expect(Time).toEqual(expect.objectContaining(TimeBounded));
    expect(Time).toEqual(expect.objectContaining(TimeNumeric));
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
});
