import { Callable } from '@w5s/core/dist/Callable.js';
import { UUID as UUIDType } from '@w5s/core/dist/Type/UUID.js';
import { UUIDApplication } from './UUID/UUIDApplication.js';
import { empty } from './UUID/empty.js';
import { of } from './UUID/of.js';

export type { UUIDString } from '@w5s/core/dist/Type/UUID.js';

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
  ...UUIDApplication,
  empty,
  of,
});
