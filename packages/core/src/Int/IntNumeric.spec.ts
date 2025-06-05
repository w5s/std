import { describe } from 'vitest';
import { describeCheckedAdd, describeCheckedMultiply, describeCheckedSubtract } from '../Testing.js';
import { IntNumeric } from './IntNumeric.js';
import { Option } from '../Option.js';
import { Int } from '../Int.js';
import { IntBounded } from './IntBounded.js';

describe('IntNumeric', () => {
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
});
