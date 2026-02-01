import { describe } from 'vitest';
import { describeSubtract } from '@w5s/core/dist/Testing.js';
import { NumberConversion } from '../NumberConversion.js';
import { Subtract } from './Subtract.js';

describe(Subtract, () => {
  const subject = { ...NumberConversion.Comparable(), ...Subtract() };
  describeSubtract(subject, [
    { call: [1, 1], returns: 0 },
    { call: [1, -1], returns: 2 },
  ]);
});
