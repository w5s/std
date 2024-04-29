import { describe, expect, it } from 'vitest';
import { andThen } from './andThen.js';
import { None } from './None.js';
import { Some } from './Some.js';

describe(andThen, () => {
  const square = (num: number) => Some(num * num);
  it('should return always None when None', () => {
    expect(andThen(None, square)).toBe(None);
  });
  it('should map value when Some', () => {
    expect(andThen(Some(4), square)).toBe(Some(16));
  });
});
