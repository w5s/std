import { Tag } from './type.js';

describe('type', () => {
  test('Tag<T, { tag1: ... }>', () => {
    expect(true).toBe(true);

    type PositiveNumber = Tag<number, { positive: true }>;
    const isPositive = (num: number): num is PositiveNumber => num >= 0;
    const squareRoot = (num: PositiveNumber): PositiveNumber => Math.sqrt(num) as PositiveNumber;
    const value = 0;
    // @ts-expect-error square root does not accept any number
    squareRoot(value); // tsc: Error
    if (isPositive(value)) {
      squareRoot(value); // tsc: Passed
    }
  });
});
