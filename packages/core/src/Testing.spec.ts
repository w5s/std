import { describe, it, expect } from 'vitest';
import * as Module from './Testing.js';

describe('Testing', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Module))).toEqual(
      new Set([
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
        'describeNumeric',
        'describePower',
        'describeRemainder',
        'describeSigned',
        'describeSubtract',
        'describeType',
        'describeZero',
        'withOrder',
      ]),
    );
  });
});
