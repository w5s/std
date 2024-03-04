import { describe, it, expect } from 'vitest';
import { Tag } from './tag.js';

describe('Tag', () => {
  type PositiveNumber = number & Tag<'Positive'>;
  const PositiveNumber = Tag.Make<number, PositiveNumber>();

  it('Tag<"...">', () => {
    expect(true).toBe(true);

    const isPositive = (num: number): num is PositiveNumber => num >= 0;
    const squareRoot = (num: PositiveNumber): PositiveNumber => Math.sqrt(num) as PositiveNumber;
    const value = 0;
    // @ts-expect-error square root does not accept any number
    squareRoot(value); // tsc: Error
    if (isPositive(value)) {
      squareRoot(value); // tsc: Passed
    }
  });
  describe('Make', () => {
    describe('#wrap', () => {
      it('returns identity', () => {
        expect(PositiveNumber.wrap(1)).toBe(1);
        // @ts-expect-error Throw a type error
        PositiveNumber.wrap('');
      });
    });
    describe('#unwrap', () => {
      it('returns identity', () => {
        const value = 1 as PositiveNumber;
        expect(PositiveNumber.unwrap(value)).toBe(1);
        // @ts-expect-error Throw a type error
        PositiveNumber.unwrap(1);
      });
    });
  });
});
