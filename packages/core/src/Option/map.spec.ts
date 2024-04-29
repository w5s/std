import { describe, expect, it } from 'vitest';
import { map } from './map.js';
import { Some } from './Some.js';
import { None } from './None.js';

describe(map, () => {
  it('should return true for Some() object', () => {
    expect(map(Some('foo'), (value) => `${value}_suffix`)).toEqual(Some('foo_suffix'));
  });
  it('should return false for None values', () => {
    expect(map(undefined, (value) => `${value}_suffix`)).toEqual(None);
    expect(map(null, (value) => `${value}_suffix`)).toEqual(None);
  });
});
