import type { Nullable } from './Nullable.js';

import { assertType } from './assertType.js';

assertType<null | number | undefined, Nullable<number>>(true);
