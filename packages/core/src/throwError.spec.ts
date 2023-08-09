import { describe, it, expect } from 'vitest';
import { throwError } from './throwError.js';

describe('throwError', () => {
  it('should return the same unchanged value', () => {
    const error = new Error('TestError');
    expect(() => {
      throwError(error);
    }).toThrow(error);
  });
});
