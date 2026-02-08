import { describe } from 'vitest';
import { describeNegate, describeNumeric, describeSigned, describeZero } from '@w5s/core/dist/Testing.js';
import { IntIntegral } from './IntIntegral.js';
import { Int } from '../Int.js';
import { IntComparable } from './IntComparable.js';

describe('IntIntegral', () => {
  describeZero(IntIntegral, {
    nonZero: () => [1, 2, -1],
  });
  describeNegate(
    { ...IntComparable, ...IntIntegral },
    {
      values: () => [
        [Int(0), Int(0)],
        [Int(1), Int(-1)],
        [Int(2), Int(-2)],
      ],
    },
  );
  describeSigned(
    { ...IntComparable, ...IntIntegral },
    {
      values: () => [
        { value: -2, type: 'negative', sign: -1, abs: 2 },
        { value: -1, type: 'negative', sign: -1, abs: 1 },
        { value: 0, type: 'zero', sign: 0, abs: 0 },
        { value: 1, type: 'positive', sign: 1, abs: 1 },
        { value: 2, type: 'positive', sign: 1, abs: 2 },
      ],
    },
  );
  describeNumeric({ ...IntComparable, ...IntIntegral });

  // describeCheckedAdd(IntNumeric, [
  //   { call: [Int(1), Int(1)], returns: Option.Some(Int(2)) },
  //   { call: [Int(1), Int(-1)], returns: Option.Some(Int(0)) },
  //   { call: [Int(1), IntBounded.maxValue], returns: Option.None },
  // ]);
  // describeCheckedSubtract(IntNumeric, [
  //   { call: [Int(1), Int(1)], returns: Option.Some(Int(0)) },
  //   { call: [Int(1), Int(-1)], returns: Option.Some(Int(2)) },
  //   { call: [IntBounded.minValue, Int(1)], returns: Option.None },
  // ]);
  // describeCheckedMultiply(IntNumeric, [
  //   { call: [Int(1), Int(1)], returns: Option.Some(Int(1)) },
  //   { call: [Int(2), Int(3)], returns: Option.Some(Int(6)) },
  //   { call: [Int(3), Int(2)], returns: Option.Some(Int(6)) },
  //   { call: [IntBounded.minValue, Int(2)], returns: Option.None },
  // ]);
  // describeCheckedPower(IntNumeric, [
  //   { call: [Int(1), Int(1)], returns: Option.Some(Int(1)) },
  //   { call: [Int(2), Int(3)], returns: Option.Some(Int(8)) },
  //   { call: [Int(2), Int(-2)], returns: Option.None },
  //   { call: [IntBounded.minValue, Int(2)], returns: Option.None },
  // ]);
});
