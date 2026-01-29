import { describe } from 'vitest';
import {
  describeAdd,
  describeMultiply,
  describeSubtract,
  describeCheckedDivide,
  describePower,
  describeRemainder,
} from '@w5s/core/dist/Testing.js';
import { NumberConversion } from '../NumberConversion.js';
import { Numeric } from './Numeric.js';

describe('NumberNumeric', () => {
  const subject = { ...NumberConversion.Comparable(), ...Numeric() };
  describeAdd(subject, [
    { call: [1, 1], returns: 2 },
    { call: [1, -1], returns: 0 },
  ]);
  describeSubtract(subject, [
    { call: [1, 1], returns: 0 },
    { call: [1, -1], returns: 2 },
  ]);
  describeMultiply(subject, [
    { call: [1, 1], returns: 1 },
    { call: [2, 3], returns: 6 },
    { call: [3, 2], returns: 6 },
  ]);
  describeRemainder(subject, [
    { call: [6, 3], returns: 0 },
    { call: [7, 3], returns: 1 },
    { call: [-7, 3], returns: -1 },
  ]);
  describeCheckedDivide(subject, [
    { call: [1, 1], returns: 1 },
    { call: [6, 2], returns: 3 },
    { call: [3, 0], returns: undefined },
  ]);
  describePower(subject, [
    { call: [1, 1], returns: 1 },
    { call: [6, 2], returns: 36 },
    { call: [10, -1], returns: 0.1 },
  ]);
});
