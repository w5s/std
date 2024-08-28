import type { JSONArray } from './JSONArray.js';
import type { JSONObject } from './JSONObject.js';
import type { JSONPrimitive } from './JSONPrimitive.js';

/**
 * Any valid JSON value
 */
export type JSONValue = JSONPrimitive | JSONArray | JSONObject;
