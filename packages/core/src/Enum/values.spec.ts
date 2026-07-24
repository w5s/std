import { describe, expect, it } from 'vitest';

import { define } from './define.js';
import { values } from './values.js';

describe(values, () => {
  it('returns the values of Enum', () => {
    const MyEnum = {
      ...define({
        Bar: 'bar',
        Foo: 'foo',
      }),
      other: true,
    };
    const actual = values(MyEnum);
    expect(actual).toEqual(['bar', 'foo']);
  });
});
