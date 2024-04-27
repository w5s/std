import { describe, it, expect } from 'vitest';
import { Tag } from './Tag.js';
import { define } from './Tag/define.js';

describe('Tag', () => {
  type PositiveNumber = number & Tag<'Positive'>;
  const PositiveNumber = Tag.define<number, PositiveNumber>({
    typeName: 'PositiveNumber',
    hasInstance: (value) => typeof value === 'number' && value > 0,
  });
  it('is an alias to functions', () => {
    expect(Tag).toEqual({
      define,
    });
  });

  it('Tag<"...">', () => {
    expect(true).toBe(true);

    const isPositive = (num: number): num is PositiveNumber => num > 0;
    const squareRoot = (num: PositiveNumber): PositiveNumber => Math.sqrt(num) as PositiveNumber;
    const value = 0;
    // @ts-expect-error square root does not accept any number
    squareRoot(value); // tsc: Error
    if (isPositive(value)) {
      squareRoot(value); // tsc: Passed
    }
  });
});
