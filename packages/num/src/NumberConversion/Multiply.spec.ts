import { describe } from 'vitest';
import { describeMultiply } from '@w5s/core/dist/Testing.js';
import { NumberConversion } from '../NumberConversion.js';
import { Multiply } from './Multiply.js';

describe(Multiply, () => {
  const subject = { ...NumberConversion.Comparable(), ...Multiply() };
  describeMultiply(subject, [
    { call: [1, 1], returns: 1 },
    { call: [2, 3], returns: 6 },
    { call: [3, 2], returns: 6 },
  ]);
});
