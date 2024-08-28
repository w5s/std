/* eslint-disable @typescript-eslint/no-unused-vars */
import type { JSONPrimitive } from './JSONPrimitive.js';

const num: JSONPrimitive = 1;
const str: JSONPrimitive = '';
const boolean: JSONPrimitive = true;
// @ts-expect-error
const symbol: JSONPrimitive = Symbol('');
// @ts-expect-error
const undef: JSONPrimitive = undefined;
const nul: JSONPrimitive = null;
// @ts-expect-error
const bigint: JSONPrimitive = 1n;

// @ts-expect-error
const array: JSONPrimitive = [1];
// @ts-expect-error
const object: JSONPrimitive = { foo: true };
