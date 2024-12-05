import { describe, it, expect } from 'vitest';
import { Int } from '@w5s/core';
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
