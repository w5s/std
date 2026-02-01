import { describe } from 'vitest';
import { describePower } from '@w5s/core/dist/Testing.js';
import { NumberConversion } from '../NumberConversion.js';
import { Power } from './Power.js';

describe(Power, () => {
  const subject = { ...NumberConversion.Comparable(), ...Power() };
  describePower(subject, [
    { call: [1, 1], returns: 1 },
    { call: [2, 3], returns: 8 },
    { call: [3, 2], returns: 9 },
  ]);
});
