import { describe, it, expect } from 'vitest';
import { write } from './write.js';
import { Ref } from '../Ref.js';

describe(write, () => {
  it('should set current value', () => {
    const ref = Ref(123);
    write(ref, 456);
    expect(ref).toEqual({ [Ref.current]: 456 });
  });
});
