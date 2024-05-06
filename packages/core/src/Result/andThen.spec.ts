import { describe, expect, it } from 'vitest';
import { Result } from '../Result.js';
import { andThen } from './andThen.js';
import { Error } from './Error.js';
import { Ok } from './Ok.js';

describe(andThen, () => {
  const square = (num: number): Result<number, 'TestError'> => Ok(num * num);
  it('should return unchanged result when Error', () => {
    expect(andThen(Error('TestError'), square)).toEqual(Error('TestError'));
  });
  it('should map value when Ok', () => {
    expect(andThen(Ok(4), square)).toEqual(Ok(16));
  });
});
