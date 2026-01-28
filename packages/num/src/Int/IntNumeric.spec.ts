import { describe } from 'vitest';
import {
  describeCheckedAdd,
  describeCheckedMultiply,
  describeCheckedPower,
  describeCheckedSubtract,
} from '@w5s/core/dist/Testing.js';
import { Option } from '@w5s/core';
import { IntNumeric } from './IntNumeric.js';
import { Int } from '../Int.js';
import { Bounded } from '../IntConversion/Bounded.js';

describe('IntNumeric', () => {
  const IntBounded = Bounded();
  describeCheckedAdd(IntNumeric, [
    { call: [Int(1), Int(1)], returns: Option.Some(Int(2)) },
    { call: [Int(1), Int(-1)], returns: Option.Some(Int(0)) },
    { call: [Int(1), IntBounded.maxValue], returns: Option.None },
  ]);
  describeCheckedSubtract(IntNumeric, [
    { call: [Int(1), Int(1)], returns: Option.Some(Int(0)) },
    { call: [Int(1), Int(-1)], returns: Option.Some(Int(2)) },
    { call: [IntBounded.minValue, Int(1)], returns: Option.None },
  ]);
  describeCheckedMultiply(IntNumeric, [
    { call: [Int(1), Int(1)], returns: Option.Some(Int(1)) },
    { call: [Int(2), Int(3)], returns: Option.Some(Int(6)) },
    { call: [Int(3), Int(2)], returns: Option.Some(Int(6)) },
    { call: [IntBounded.minValue, Int(2)], returns: Option.None },
  ]);
  describeCheckedPower(IntNumeric, [
    { call: [Int(1), Int(1)], returns: Option.Some(Int(1)) },
    { call: [Int(2), Int(3)], returns: Option.Some(Int(8)) },
    { call: [Int(2), Int(-2)], returns: Option.None },
    { call: [IntBounded.minValue, Int(2)], returns: Option.None },
  ]);
});
