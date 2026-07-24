import { Int } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import { of } from './of.js';

describe(of, () => {
  it('should return a new object', () => {
    expect(of('Test', Int(3))).toEqual({
      _: 'LogLevel',
      name: 'Test',
      value: 3,
    });
  });
});
