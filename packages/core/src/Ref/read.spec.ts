import { describe, it, expect } from 'vitest';
import { read } from './read.js';
import { Ref } from '../Ref.js';

describe(read, () => {
  it('should return current value', () => {
    const ref = Ref(123);
    expect(Ref.read(ref)).toEqual(123);
  });
});
