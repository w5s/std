import { describe, expect, it } from 'vitest';
import { Ok } from './Ok.js';
import { assertType } from '../testing.js';
import type { Result } from '../Result.js';

describe(Ok, () => {
  it('should return a new object', () => {
    expect(Ok('anyValue')).toEqual({ _: 'Ok', ok: true, value: 'anyValue' });
  });
  it('should return void result when value is omitted', () => {
    const result = Ok();
    expect(result).toEqual({ _: 'Ok', ok: true, value: undefined });
    assertType<typeof result, Result<void, never>>(true);
  });
});
