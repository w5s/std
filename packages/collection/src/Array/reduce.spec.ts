import { describe, it, expect, vi } from 'vitest';
import { reduce } from './reduce.js';

describe(reduce, () => {
  it('should map each value to callback', () => {
    const array = ['foo', 'bar', 'baz'];
    const concat = (_: string, value: string) => `${_}:${value}`;
    vi.spyOn(array, 'reduce' as any);

    expect(reduce(array, concat, '$')).toEqual('$:foo:bar:baz');
    expect(array.reduce).toHaveBeenLastCalledWith(concat, '$');
  });
});
