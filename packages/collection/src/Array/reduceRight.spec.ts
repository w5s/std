import { describe, it, expect, vi } from 'vitest';
import { reduceRight } from './reduceRight.js';

describe(reduceRight, () => {
  it('should map each value to callback', () => {
    const array = ['foo', 'bar', 'baz'];
    const concat = (_: string, value: string) => `${_}:${value}`;
    vi.spyOn(array, 'reduceRight' as any);

    expect(reduceRight(array, concat, '$')).toEqual('$:baz:bar:foo');
    expect(array.reduceRight).toHaveBeenLastCalledWith(concat, '$');
  });
});
