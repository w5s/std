import type { Bounded } from '@w5s/core';
import type { Time } from '../Time.js';

const bound = 8.64e15;

export const TimeBounded: Bounded<Time> = {
  maxValue: bound as Time,
  minValue: -bound as Time,
};
