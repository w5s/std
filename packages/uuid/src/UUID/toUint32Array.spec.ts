import { describe, it, expect } from 'vitest';
import { toUint32Array } from './toUint32Array.js';
import { of } from './of.js';

describe(toUint32Array, () => {
  it('should return a 0 based UUID', () => {
    const uuid = of('1c19548b-7cac-4222-b722-dc38f2870669');
    expect(toUint32Array(uuid)).toEqual(new Uint32Array([0x1c_19_54_8b, 0x7c_ac_42_22, 0xb7_22_dc_38, 0xf2_87_06_69]));
  });
});
