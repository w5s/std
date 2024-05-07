import { describe, it, expect, vi } from 'vitest';
import { some } from './some.js';

describe(some, () => {
  it('should map each value to callback', () => {
    const array = [1, 2, 3];
    vi.spyOn(array, 'some' as any);

    const eq3 = (_: number) => _ === 3;
    expect(some(array, eq3)).toEqual(true);
    expect(array.some).toHaveBeenLastCalledWith(eq3);
    expect(some([], eq3)).toEqual(false);
  });
});
