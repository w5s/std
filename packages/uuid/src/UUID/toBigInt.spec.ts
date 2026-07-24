import { describe, expect, it } from 'vitest';

import { of } from './of.js';
import { toBigInt } from './toBigInt.js'; // Replace with the actual path to your module

describe(toBigInt, () => {
  it('should correctly convert a valid UUID to a bigint', () => {
    const uuid = of('1c19548b-7cac-4222-b722-dc38f2870669');
    const expectedBigInt = 0x1C_19_54_8B_7C_AC_42_22_B7_22_DC_38_F2_87_06_69n;
    expect(toBigInt(uuid)).toBe(expectedBigInt);
  });
});
