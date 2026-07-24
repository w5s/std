import { describe, expect, it } from 'vitest';

import { of } from './of.js';
import { Time } from './Time.js';

describe(of, () => {
  it('should throw invariant error', () => {
    expect(() => Time(NaN)).toThrow('NaN is not a valid Time');
  });
  it('should return unchanged value when positive', () => {
    expect(Time(1)).toBe(1);
  });
});
