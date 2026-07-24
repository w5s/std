import type { Pretty } from './Pretty.js';

import { assertType } from './assertType.js';

assertType<{ bar: string; foo: number }, Pretty<{ bar: string } & { foo: number }>>(true);
