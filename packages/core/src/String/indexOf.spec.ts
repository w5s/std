import { describe, expect, it } from 'vitest';
import { indexOf } from './indexOf.js';
import { Option } from '../Option.js';

describe(indexOf, () => {
  it('should return index of element', () => {
    const string = 'aaa';
    expect(indexOf(string, 'a')).toEqual(0);
  });
  it('should return index of element with startIndex', () => {
    const string = 'aaa';
    expect(indexOf(string, 'a', 1)).toEqual(1);
  });
  it('should return Option.None when not found', () => {
    const string = 'abc';
    expect(indexOf(string, 'non_existent', 1)).toEqual(Option.None);
  });
});
