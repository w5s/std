import { describe, it, expect } from 'vitest';
import { Ordering } from './Ordering.js';
import { Enum } from '../Enum.js';

describe('Ordering', () => {
  it('should have a typeName property', () => {
    expect(Ordering.typeName).toBe('Ordering');
  });
  it('should have the correct values for Less, Equal, and Greater', () => {
    expect(Enum.values(Ordering)).toMatchInlineSnapshot(`
      [
        -1,
        0,
        1,
      ]
    `);
  });
});
