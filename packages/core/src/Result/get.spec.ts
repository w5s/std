import { describe, expect, it } from 'vitest';
import { assertType } from '@w5s/core-type';
import { get } from './get.js';
import { Error } from './Error.js';
import { Option } from '../Option.js';
import { Ok } from './Ok.js';
import { Result } from '../Result.js';

describe(get, () => {
  it('should return undefined for Error', () => {
    const value = get(Error('anyError'));
    expect(value).toBe(Option.None);
    assertType<typeof value, Option.None>(true);
  });
  it('should return value for Ok', () => {
    const value = get(Ok('anyValue' as const));
    expect(value).toBe('anyValue');
    assertType<typeof value, 'anyValue'>(true);

    const anyResult: Result<'anyValue', 'anyError'> = Ok('anyValue');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optValue = get(anyResult);
    assertType<typeof optValue, 'anyValue' | Option.None>(true);
  });
});
