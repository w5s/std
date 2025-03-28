import { describe, it, expect } from 'vitest';
import { panic } from './panic.js';

describe(panic, () => {
  it('should return the same unchanged value', () => {
    const error = new Error('TestError');
    expect(() => {
      panic(error);
    }).toThrow(error);
  });
});
