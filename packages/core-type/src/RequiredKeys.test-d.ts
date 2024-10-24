import { assertType } from './assertType.js';
import type { RequiredKeys } from './RequiredKeys.js';

type RequiredObject = RequiredKeys<{ foo?: boolean; bar?: string; optional: number }, 'bar'>;

assertType<RequiredObject, { foo?: boolean; bar: string; optional: number }>(true);
