import { describe, expect, it } from 'vitest';

import { define } from './define.js';
import { keys } from './keys.js';

describe(keys, () => {
  it('returns the keys of Enum', () => {
    const MyEnum = {
      ...define({
        Bar: 'bar',
        Foo: 'foo',
      }),
      other: true,
    };
    const actual = keys(MyEnum);
    expect(actual).toEqual(['Bar', 'Foo']);
  });
});
