import { describe, expect, it } from 'vitest';

import { Ref } from '../Ref.js';
import { write } from './write.js';

describe(write, () => {
  it('should set current value', () => {
    const ref = Ref(123);
    write(ref, 456);
    expect(ref).toEqual({ [Ref.current]: 456 });
  });
});
