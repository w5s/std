import { assertType } from './assertType.js';
import type { Nullable } from './Nullable.js';

assertType<number | null | undefined, Nullable<number>>(true);
