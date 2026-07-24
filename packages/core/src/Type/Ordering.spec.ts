import { describe, expect, it } from 'vitest';

import { Enum } from '../Enum.js';
import { Ordering } from './Ordering.js';

describe('Ordering', () => {
  it('should have a typeName property', () => {
    expect(Ordering.typeName).toBe('Ordering');
  });
  it('should have the correct values for Less, Equal, and Greater', () => {
    expect(Enum.values(Ordering).toSorted((left, right) => left - right)).toMatchInlineSnapshot(`
      [
        -1,
        0,
        1,
      ]
    `);
  });
});
