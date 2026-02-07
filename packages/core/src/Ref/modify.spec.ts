import { describe, it, expect } from 'vitest';
import { Ref } from '../Ref.js';
import { modify } from './modify.js';

describe(modify, () => {
  it('should set current value using map function', () => {
    const ref = Ref(123);
    modify(ref, (_) => _ * 2);
    expect(ref).toEqual({ [Ref.current]: 246 });
  });
});
