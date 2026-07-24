import { Callable } from '@w5s/core/dist/Callable.js';

import * as StatusAll from './Status/status.all.js';
import { Status as StatusType } from './Status/Status.js';
import { StatusBounded } from './Status/StatusBounded.js';
import { StatusComparable } from './Status/StatusComparable.js';
import { StatusIndexable } from './Status/StatusIndexable.js';

/**
 * @namespace
 */
export const Status = Callable({
  ...StatusType,
  ...StatusAll,
  ...StatusBounded,
  ...StatusComparable,
  ...StatusIndexable,
});

export interface Status extends StatusType {}
