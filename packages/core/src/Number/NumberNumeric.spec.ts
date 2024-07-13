import { describe, it, expect } from 'vitest';
import { describeAdd, describeMultiply, describeSubtract } from '../Testing.js';
import { NumberComparable } from './NumberComparable.js';
import { NumberNumeric } from './NumberNumeric.js';

describe('NumberNumeric', () => {
  describeAdd({ describe, it, expect })({ ...NumberComparable, ...NumberNumeric }, [
    { call: [1, 1], returns: 2 },
    { call: [1, -1], returns: 0 },
  ]);
  describeSubtract({ describe, it, expect })({ ...NumberComparable, ...NumberNumeric }, [
    { call: [1, 1], returns: 0 },
    { call: [1, -1], returns: 2 },
  ]);
  describeMultiply({ describe, it, expect })({ ...NumberComparable, ...NumberNumeric }, [
    { call: [1, 1], returns: 1 },
    { call: [2, 3], returns: 6 },
    { call: [3, 2], returns: 6 },
  ]);
});
