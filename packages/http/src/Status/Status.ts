import type { Type } from '@w5s/core';
import { Callable } from '@w5s/core/dist/Callable.js';
import { number } from '@w5s/core/dist/Type/number.js';
import { $Object } from '@w5s/core/dist/Type/Object.js';
import { string } from '@w5s/core/dist/Type/string.js';

/**
 * @namespace
 */
export const Status = Callable({
  [Callable.symbol]: <Code extends Status['statusCode']>(statusCode: Code, statusMessage: Status['statusMessage']) =>
    ({
      statusCode,
      statusMessage,
    }) satisfies Status,
  ...$Object({
    /**
     * Standard HTTP status code number
     */
    statusCode: number,
    /**
     * Standard HTTP status message
     */
    statusMessage: string,
  }),
});

export interface Status extends Type.TypeOf<typeof Status> {}
