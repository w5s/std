import { describe } from 'vitest';
import { describeAdd, describeMultiply, describeSubtract, describeCheckedDivide, describePower } from '../Testing.js';
import { NumberComparable } from './NumberComparable.js';
import { NumberNumeric } from './NumberNumeric.js';

describe('NumberNumeric', () => {
  const subject = { ...NumberComparable, ...NumberNumeric };
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
