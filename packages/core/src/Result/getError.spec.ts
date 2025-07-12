import { describe, expect, it } from 'vitest';
import { assertType } from '@w5s/core-type';
import { getError } from './getError.js';
import { Ok } from './Ok.js';
import { Option } from '../Option.js';
import { Error } from './Error.js';
import { Result } from '../Result.js';

describe(getError, () => {
  const anyValue = 'anyValue' as const;

  const anyError = 'anyError' as const;
  it('should return undefined for Ok', () => {
    const error = getError(Ok(anyValue));
    expect(error).toBe(Option.None);
    assertType<typeof error, Option.None>(true);
  });
  it('should return error for Ok', () => {
    const error = getError(Error(anyError));
    expect(error).toBe(anyError);
    assertType<typeof error, typeof anyError>(true);

    const anyResult: Result<'anyValue', 'anyError'> = Ok('anyValue');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optError = getError(anyResult);
    assertType<typeof optError, typeof anyError | Option.None>(true);
  });
});
