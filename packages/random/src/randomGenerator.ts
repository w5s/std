import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import { RandomApplication } from './Random/RandomApplication.js';

export interface RandomGenerator extends Task<number, never> {}

export const randomGenerator: RandomGenerator = taskFrom(({ resolve }) =>
  resolve(RandomApplication.get('randomNumberGenerator')()),
);
