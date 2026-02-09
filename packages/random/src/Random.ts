import { next } from './Random/next.js';
import { RandomApplication } from './Random/RandomApplication.js';

/**
 * Random namespace
 *
 * @namespace
 */
export const Random = {
  ...RandomApplication,
  next,
};
