import { describe, expect, it } from 'vitest';
import { values } from './values.js';
import { define } from './define.js';

describe(values, () => {
  it('returns the values of Enum', () => {
    const MyEnum = {
      ...define({
        Foo: 'foo',
        Bar: 'bar',
      }),
      other: true,
    };
    const actual = values(MyEnum);
    expect(actual).toEqual(['foo', 'bar']);
  });
});
