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
        'describeEqual',
        'describeIndexable',
        'describeMultiply',
        'describeSigned',
        'describeSubtract',
        'describeDivide',
        'describeType',
        'withOrder',
      ].sort(),
    );
  });
});
