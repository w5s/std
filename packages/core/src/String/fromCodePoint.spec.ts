import { describe, it, expect } from 'vitest';
import { fromCodePoint } from './fromCodePoint.js';

describe(fromCodePoint, () => {
  it('should return true only when present', () => {
    expect(fromCodePoint(65, 65)).toEqual('AA');
    expect(fromCodePoint(9731, 9731)).toEqual('☃☃');
  });
});
