import { describe, expect, it } from 'vitest';
import { Money } from './Money.js';

describe('Money', () => {
  it('has defined shape', () => {
    expect(Money).toMatchInlineSnapshot(`[Function]`);
    expect(Money).toEqual(
      expect.objectContaining({
        '+': expect.any(Function),
        '-': expect.any(Function),
        format: expect.any(Function),
        parse: expect.any(Function),
      }),
    );
  });
});
