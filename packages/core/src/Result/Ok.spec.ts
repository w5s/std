import { describe, expect, it } from 'vitest';
import { assertType } from '@w5s/core-type';
import { Ok } from './Ok.js';
import type { Result } from '../Result.js';

describe(Ok, () => {
  it('should return a new object', () => {
    expect(Ok('anyValue')).toEqual({ ok: true, value: 'anyValue' });
  });
  it('should return void result when value is omitted', () => {
    const result = Ok();
    expect(result).toEqual({ ok: true, value: undefined });
    assertType<typeof result, Result<void, never>>(true);
  });
});
