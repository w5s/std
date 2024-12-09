import { describe, it, expect } from 'vitest';
import { toBigInt } from './toBigInt.js'; // Replace with the actual path to your module
import { of } from './of.js';

describe(toBigInt, () => {
  it('should correctly convert a valid UUID to a bigint', () => {
    const uuid = of('1c19548b-7cac-4222-b722-dc38f2870669');
    const expectedBigInt = BigInt('0x1c19548b7cac4222b722dc38f2870669');
    expect(toBigInt(uuid)).toBe(expectedBigInt);
  });
});
