/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { JSONArray } from './JSONArray.js';

// @ts-expect-error
const num: JSONArray = 1;
// @ts-expect-error
const str: JSONArray = '';
// @ts-expect-error
const boolean: JSONArray = true;
// @ts-expect-error
const symbol: JSONArray = Symbol('');
// @ts-expect-error
const undef: JSONArray = undefined;
// @ts-expect-error
const nul: JSONArray = null;
// @ts-expect-error
const bigint: JSONArray = 1n;

const array: JSONArray = [1];
// @ts-expect-error
const object: JSONArray = { foo: true };
