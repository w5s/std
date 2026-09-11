import type { WritableKeys } from './WritableKeys.js';

import { assertType } from './assertType.js';

interface SomeObject { readonly a: number; readonly b: string }

assertType<WritableKeys<SomeObject, 'a'>, { a: number; readonly b: string }>(true);
