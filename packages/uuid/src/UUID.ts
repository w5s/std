import { Callable } from '@w5s/core/Callable';
import { UUID as UUIDType } from '@w5s/core/Type/UUID';

import { empty } from './UUID/empty.js';
import { of } from './UUID/of.js';
import { toBigInt } from './UUID/toBigInt.js';
import { toUint32Array } from './UUID/toUint32Array.js';

export type { UUIDString } from '@w5s/core/Type/UUID';

/**
 * UUID string type
 */
export type UUID = UUIDType;

/**
 * UUID namespace
 *
 * @namespace
 */
export const UUID = Callable({
  ...UUIDType,
  empty,
  of,
  toBigInt,
  toUint32Array,
});
