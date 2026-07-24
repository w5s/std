import type { RequiredKeys } from './RequiredKeys.js';

import { assertType } from './assertType.js';

type RequiredObject = RequiredKeys<{ bar?: string; foo?: boolean; optional: number }, 'bar'>;

assertType<RequiredObject, { bar: string; foo?: boolean; optional: number }>(true);
