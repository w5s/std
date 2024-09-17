import { Status as StatusType } from './Status/Status.js';
import * as StatusAll from './Status/status.all.js';

/**
 * @namespace
 */
export const Status = {
  ...StatusType,
  ...StatusAll,
};

export interface Status extends StatusType {}
