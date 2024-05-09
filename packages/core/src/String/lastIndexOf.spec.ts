import { describe, expect, it } from 'vitest';
import { lastIndexOf } from './lastIndexOf.js';
import { Option } from '../Option.js';

describe(lastIndexOf, () => {
  it('should return index of element', () => {
    const string = 'aaa';
    expect(lastIndexOf(string, 'a')).toEqual(2);
  });
  it('should return index of element with startIndex', () => {
    const string = 'aaa';
    expect(lastIndexOf(string, 'a', 1)).toEqual(1);
  });
  it('should return Option.None when not found', () => {
    const string = 'abc';
    expect(lastIndexOf(string, 'non_existent', 1)).toEqual(Option.None);
  });
});
