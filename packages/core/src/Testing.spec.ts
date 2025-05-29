import { describe, it, expect } from 'vitest';
import * as Module from './Testing.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // public exports
        'describeAdd',
        'describeBounded',
        'describeCheckedAdd',
        'describeCheckedMultiply',
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
        'describeSigned',
        'describeSubtract',
        'describeType',
        'describeZero',
        'withOrder',
      ].sort(),
    );
  });
});
