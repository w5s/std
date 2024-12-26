import { describe, it, expect } from 'vitest';
import { Int } from '@w5s/core';
import { asString } from './asString.js';
import { of } from './of.js';

describe(asString, () => {
  it('should return the string representation of the log level', () => {
    const level = of('Info', Int(2));
    expect(asString(level)).toBe('Info');
  });

  it('should handle empty string as log level name', () => {
    const level = of('', Int(2));
    expect(asString(level)).toBe('');
  });
});
