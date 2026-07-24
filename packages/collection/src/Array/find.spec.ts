import { describe, expect, it, vi } from 'vitest';

import { Option } from '../../../core/src/Option.js';
import { find } from './find.js';

describe(find, () => {
  it('should map each value to callback', () => {
    const array = ['a', 'b', 'c'];
    vi.spyOn(array, 'find' as any);

    expect(find(array, (_) => _ === 'a')).toEqual('a');
    expect(find(array, (_) => _ === 'non_existent')).toEqual(Option.None);
  });
});
