import { describe, expect, it } from 'vitest';
import { getOrElse } from './getOrElse.js';
import { None } from './None.js';
import { Some } from './Some.js';

describe(getOrElse, () => {
  it('should return defaultValue for Result.Error', () => {
    expect(getOrElse(None, () => 'any_default_value')).toEqual('any_default_value');
  });
  it('should return value for Result.Ok', () => {
    expect(getOrElse(Some('foo'), () => 'any_default_value')).toBe('foo');
  });
});
