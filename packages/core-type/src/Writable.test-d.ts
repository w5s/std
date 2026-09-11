import type { Writable } from './Writable.js';

import { assertType } from './assertType.js';

interface SomeObject { readonly a: number; readonly b: string }

assertType<Writable<SomeObject>, { a: number; b: string }>(true);

assertType<Writable<ReadonlyArray<number>>, Array<number>>(true);
