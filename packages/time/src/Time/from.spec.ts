import { describe, expect, it } from 'vitest';

import { from } from './from.js';

describe(from, () => {
  it('should return a task that resolves to a Time from a number', async () => {
    const time = from(1_643_723_400_000);
    expect(time).toBe(1_643_723_400_000);
  });

  it('should return a task that resolves to a Time from an object', async () => {
    const time = from({
      day: 21,
      hour: 12,
      millisecond: 1,
      minute: 2,
      month: 1,
      year: 2022,
    });
    expect(time).toBe(1_642_766_520_001);
  });
});
