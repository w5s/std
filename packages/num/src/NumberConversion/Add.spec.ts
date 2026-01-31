import { describe } from 'vitest';
import { describeAdd } from '@w5s/core/dist/Testing.js';
import { NumberConversion } from '../NumberConversion.js';
import { Add } from './Add.js';

describe(Add, () => {
  const subject = { ...NumberConversion.Comparable(), ...Add() };
  describeAdd(subject, [
    { call: [1, 1], returns: 2 },
    { call: [1, -1], returns: 0 },
  ]);
});
