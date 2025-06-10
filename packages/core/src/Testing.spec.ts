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
        'describeCheckedMultiply',
        'describeCheckedPower',
        'describeCheckedSubtract',
        'describeCheckedDivide',
        'describeCodec',
        'describeComparable',
        'describeDivide',
        'describeEqual',
        'describeIndexable',
        'describeMultiply',
        'describeNegate',
        'describeNot',
        'describePower',
        'describeSigned',
        'describeSubtract',
        'describeType',
        'describeZero',
        'withOrder',
      ].sort(),
    );
  });
});
