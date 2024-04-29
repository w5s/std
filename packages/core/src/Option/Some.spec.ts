import { describe, expect, it } from 'vitest';
import { Some } from './Some.js';

describe('Some', () => {
  it('should be an identity function', () => {
    expect(Some('blah')).toBe('blah');
  });
  it('should throw an TypeError if undefined or null is passed', () => {
    // @ts-ignore this is a voluntary violation
    expect(() => Some(null)).toThrow(new TypeError('Value must be non null, non undefined value'));
    // @ts-ignore this is a voluntary violation
    expect(() => Some(undefined)).toThrow(new TypeError('Value must be non null, non undefined value'));
  });
  it('should report an error in typescript for null', () => {
    expect(() => {
      // @ts-expect-error null is forbidden
      Some(null);
      // @ts-expect-error undefined is forbidden
      Some(undefined);
    }).toThrow();
  });
});
