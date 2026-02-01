import { describe } from 'vitest';
import { describeRemainder } from '@w5s/core/dist/Testing.js';
import { NumberConversion } from '../NumberConversion.js';
import { Remainder } from './Remainder.js';

describe(Remainder, () => {
  const subject = { ...NumberConversion.Comparable(), ...Remainder() };
  describeRemainder(subject, [
    { call: [6, 3], returns: 0 },
    { call: [7, 3], returns: 1 },
    { call: [-7, 3], returns: -1 },
  ]);
});
