import { Callable } from '@w5s/core/dist/Callable.js';
import { Status as StatusType } from './Status/Status.js';
import { StatusBounded } from './Status/StatusBounded.js';
import { StatusComparable } from './Status/StatusComparable.js';
import * as StatusAll from './Status/status.all.js';

/**
 * @namespace
 */
export const Status = Callable({
  ...StatusType,
  ...StatusAll,
  ...StatusBounded,
  ...StatusComparable,
});

export interface Status extends StatusType {}
