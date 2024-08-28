import type { JSONValue } from './JSONValue.js';

/**
 * Record of JSONValue
 */
export type JSONObject = {
  [key: string]: JSONValue;
};
