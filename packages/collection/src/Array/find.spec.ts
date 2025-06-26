import { describe, it, expect, vi } from 'vitest';
import { find } from './find.js';
import { Option } from '../../../core/src/Option.js';

describe(find, () => {
  it('should map each value to callback', () => {
    const array = ['a', 'b', 'c'];
    vi.spyOn(array, 'find' as any);

    expect(find(array, (_) => _ === 'a')).toEqual('a');
    expect(find(array, (_) => _ === 'non_existent')).toEqual(Option.None);
  });
});
