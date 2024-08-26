import { assertType } from './assertType.js';
import type { PartialKeys } from './PartialKeys.js';

type PartialObject = PartialKeys<{ foo: boolean; bar: string; optional?: number }, 'bar'>;

assertType<PartialObject, { foo: boolean; bar?: string; optional?: number }>(true);
