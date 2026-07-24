import type { PartialKeys } from './PartialKeys.js';

import { assertType } from './assertType.js';

type PartialObject = PartialKeys<{ bar: string; foo: boolean; optional?: number }, 'bar'>;

assertType<PartialObject, { bar?: string; foo: boolean; optional?: number }>(true);
