/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ObjectLike } from './ObjectLike.js';

// @ts-expect-error Number
const num: ObjectLike = 1;
// @ts-expect-error String
const str: ObjectLike = '';
// @ts-expect-error Boolean
const bool: ObjectLike = true;
// @ts-expect-error undefined
const undef: ObjectLike = undefined;
// @ts-expect-error null
const undef: ObjectLike = null;

const sym: ObjectLike = Symbol('foo');
const obj: ObjectLike = { foo: true };
const fn: ObjectLike = function foo() {};
