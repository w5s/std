/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { JSONObject } from './JSONObject.js';

// @ts-expect-error
const num: JSONObject = 1;
// @ts-expect-error
const str: JSONObject = '';
// @ts-expect-error
const boolean: JSONObject = true;
// @ts-expect-error
const symbol: JSONObject = Symbol('');
// @ts-expect-error
const undef: JSONObject = undefined;
// @ts-expect-error
const nul: JSONObject = null;
// @ts-expect-error
const bigint: JSONObject = 1n;
// @ts-expect-error
const array: JSONObject = [1];

const object: JSONObject = { foo: true };
