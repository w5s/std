import { describe, expect, it } from 'vitest';

import { Ref } from '../Ref.js';
import { read } from './read.js';

describe(read, () => {
  it('should return current value', () => {
    const ref = Ref(123);
    expect(Ref.read(ref)).toEqual(123);
  });
});
