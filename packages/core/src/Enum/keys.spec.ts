import { describe, expect, it } from 'vitest';
import { keys } from './keys.js';
import { define } from './define.js';

describe(keys, () => {
  it('returns the keys of Enum', () => {
    const MyEnum = {
      ...define({
        Foo: 'foo',
        Bar: 'bar',
      }),
      other: true,
    };
    const actual = keys(MyEnum);
    expect(actual).toEqual(['Foo', 'Bar']);
  });
});
