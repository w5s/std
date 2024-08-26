import { describe, expect, it } from 'vitest';
import { assertType } from '@w5s/core-type';
import { getOrThrow } from './getOrThrow.js';
import { Some } from './Some.js';

describe(getOrThrow, () => {
  it('should return undefined for undefined,null', () => {
    expect(() => {
      getOrThrow(undefined);
    }).toThrow();
    expect(() => {
      getOrThrow(null);
    }).toThrow();
  });
  it('should return value for Some()', () => {
    const option = Some<string>('foo');
    const foo = getOrThrow(option);
    expect(foo).toBe('foo');

    assertType<typeof foo, string>(true);
  });
});
