import { assertType } from './assertType.js';
import type { Pretty } from './Pretty.js';

assertType<{ foo: number; bar: string }, Pretty<{ foo: number } & { bar: string }>>(true);
