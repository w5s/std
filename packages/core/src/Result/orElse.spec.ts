import { describe, expect, it } from 'vitest';
import { Result } from '../Result.js';
import { Ok } from './Ok.js';
import { orElse } from './orElse.js';
import { Error } from './Error.js';

describe(orElse, () => {
  const handleError = (message: string): Result<string, 'TestError'> => Ok(`${message}_handled`);

  it('should return unchanged result when Ok', () => {
    expect(orElse(Ok(1), handleError)).toEqual(Ok(1));
  });
  it('should map value when Error', () => {
    expect(orElse(Error('myMessage'), handleError)).toEqual(Ok('myMessage_handled'));
  });
});
