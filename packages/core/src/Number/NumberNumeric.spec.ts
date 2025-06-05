import { describe } from 'vitest';
import { describeAdd, describeMultiply, describeSubtract, describeCheckedDivide } from '../Testing.js';
import { NumberComparable } from './NumberComparable.js';
import { NumberNumeric } from './NumberNumeric.js';

describe('NumberNumeric', () => {
  describeAdd({ ...NumberComparable, ...NumberNumeric }, [
    { call: [1, 1], returns: 2 },
    { call: [1, -1], returns: 0 },
  ]);
  describeSubtract({ ...NumberComparable, ...NumberNumeric }, [
    { call: [1, 1], returns: 0 },
    { call: [1, -1], returns: 2 },
  ]);
  describeMultiply({ ...NumberComparable, ...NumberNumeric }, [
    { call: [1, 1], returns: 1 },
    { call: [2, 3], returns: 6 },
    { call: [3, 2], returns: 6 },
  ]);
  describeCheckedDivide({ ...NumberComparable, ...NumberNumeric }, [
    { call: [1, 1], returns: 1 },
    { call: [6, 2], returns: 3 },
    { call: [3, 0], returns: undefined },
  ]);
});
