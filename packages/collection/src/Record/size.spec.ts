import { describe, expect, it } from 'vitest';

import { empty } from './empty.js';
import { size } from './size.js';

describe(size, () => {
  it('should return 0 for empty', () => {
    expect(size(empty())).toEqual(0);
  });
  it('should return an array of keys', () => {
    expect(size({ anyKey: 'anyValue', anyOtherKey: 'anyOtherValue' })).toEqual(2);
  });
});
