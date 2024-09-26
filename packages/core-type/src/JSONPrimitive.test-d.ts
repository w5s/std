/* eslint-disable @typescript-eslint/no-unused-vars */
import type { JSONPrimitive } from './JSONPrimitive.js';

const num: JSONPrimitive = 1;
const str: JSONPrimitive = '';
const boolean: JSONPrimitive = true;
// @ts-expect-error Symbol is not a primitive
const symbol: JSONPrimitive = Symbol('');
// @ts-expect-error undefined is not a json primitive
const undef: JSONPrimitive = undefined;
const nul: JSONPrimitive = null;
// @ts-expect-error decimal is not a json primitive
const bigint: JSONPrimitive = 1n;

// @ts-expect-error array is not a json primitive
const array: JSONPrimitive = [1];
// @ts-expect-error object is not a json primitive
const object: JSONPrimitive = { foo: true };
