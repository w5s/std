import { describe, it, expect, vi } from 'vitest';
import { every } from './every.js';

describe(every, () => {
  it('should map each value to callback', () => {
    const array = [1, 2, 3];
    vi.spyOn(array, 'every' as any);

    const isNumber = (_: number) => typeof _ === 'number';
    expect(every(array, isNumber)).toEqual(true);
    expect(array.every).toHaveBeenLastCalledWith(isNumber);
    expect(every([], isNumber)).toEqual(true);
  });
});
