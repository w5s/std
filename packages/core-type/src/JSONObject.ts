/* eslint-disable ts/consistent-indexed-object-style */
/* eslint-disable ts/consistent-type-definitions */
import type { JSONValue } from './JSONValue.js';

/**
 * Record of JSONValue
 */
export type JSONObject = {
  [key: string]: JSONValue;
};
