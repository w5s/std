import { describe, it, expect } from 'vitest';
import * as Module from './Testing.js';

describe('Testing', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // public exports
        'describeAdd',
        'describeAsString',
        'describeBounded',
        'describeCheckedAdd',
        'describeCheckedDivide',
        'describeCheckedMultiply',
        'describeCheckedPower',
        'describeCheckedRemainder',
        'describeCheckedSubtract',
        'describeCodec',
        'describeComparable',
        'describeDivide',
        'describeEqual',
        'describeIndexable',
        'describeMultiply',
        'describeNegate',
        'describeNot',
        'describePower',
        'describeRemainder',
        'describeSigned',
        'describeSubtract',
        'describeType',
        'describeZero',
        'withOrder',
      ].sort(),
    );
  });
});
