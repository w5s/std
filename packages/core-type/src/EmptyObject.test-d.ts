/* eslint-disable @typescript-eslint/no-unused-vars */
import { assertType } from './assertType.js';
import type { EmptyObject } from './EmptyObject.js';

declare let foo: EmptyObject;

// @ts-expect-error For array
foo = [];
// @ts-expect-error For non empty object
foo = { x: 1 };
// @ts-expect-error For number
foo = 42;
// @ts-expect-error For null
foo = null;
// @ts-expect-error For nested
foo.bar = 42;
// @ts-expect-error For empty object
foo.bar = {};

type Union = EmptyObject | { id: number };

const bar: Union = {};

const baz: Union = { id: 42 };
assertType<{ id: number }, typeof baz>(true);
