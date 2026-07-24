import { describe, expect, it } from 'vitest';

import { padEnd } from './padEnd.js';

describe(padEnd, () => {
  it('should use custom padString when specified', () => {
    expect(padEnd('abc', 7, '1234')).toBe('abc1234');
  });
});
