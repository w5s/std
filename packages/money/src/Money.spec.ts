import { describe, expect, it } from 'vitest';
import { Money } from './Money.js';
import { MoneyNegate } from './Money/MoneyNegate.js';
import { MoneyComparable } from './Money/MoneyComparable.js';
import { MoneyZero } from './Money/MoneyZero.js';
import { MoneySigned } from './Money/MoneySigned.js';

describe('Money', () => {
  it('has defined shape', () => {
    expect(Money).toMatchInlineSnapshot(`[Function]`);
    expect(Money).toEqual(expect.objectContaining(MoneyComparable));
    expect(Money).toEqual(expect.objectContaining(MoneyNegate));
    expect(Money).toEqual(expect.objectContaining(MoneySigned));
    expect(Money).toEqual(expect.objectContaining(MoneyZero));
    expect(Money).toEqual(
      expect.objectContaining({
        '+': expect.any(Function),
        '-': expect.any(Function),
        asString: expect.any(Function),
        format: expect.any(Function),
        normalize: expect.any(Function),
        parse: expect.any(Function),
      }),
    );
  });
});
