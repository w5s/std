/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Primitive } from './Primitive.js';

const num: Primitive = 1;
const str: Primitive = '';
const boolean: Primitive = true;
const symbol: Primitive = Symbol('');
const undef: Primitive = undefined;
const nul: Primitive = null;
const bigint: Primitive = 1n;

// @ts-expect-error
const array: Primitive = [];
// @ts-expect-error
const object: Primitive = {};
