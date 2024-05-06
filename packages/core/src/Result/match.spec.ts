import { describe, expect, it } from 'vitest';
import { match } from './match.js';
import { Ok } from './Ok.js';
import { Error } from './Error.js';

describe(match, () => {
  it('should call matchers.Ok when Ok', () => {
    expect(
      match(Ok('ok'), {
        Ok: (value) => `${value}_value`,
        Error: (error) => `${error}_error`,
      })
    ).toEqual('ok_value');
  });
  it('should call matchers.Error when Error', () => {
    expect(
      match(Error('error'), {
        Ok: (value) => `${value}_value`,
        Error: (error) => `${error}_error`,
      })
    ).toEqual('error_error');
  });
});
