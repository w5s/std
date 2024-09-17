import type { Type } from '@w5s/core';
import { number } from '@w5s/core/dist/Type/number.js';
import { $Object } from '@w5s/core/dist/Type/Object.js';
import { string } from '@w5s/core/dist/Type/string.js';

export const Status = $Object({
  /**
   * Standard HTTP status code number
   */
  statusCode: number,
  /**
   * Standard HTTP status message
   */
  statusMessage: string,
});

export interface Status extends Type.TypeOf<typeof Status> {}
