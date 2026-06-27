import type { Type } from '@w5s/core/Type';
import { Callable } from '@w5s/core/Callable';
import { Int } from '@w5s/core/Type/Int';
import { TObject } from '@w5s/core/Type/Object';
import { string } from '@w5s/core/Type/string';

/**
 * @namespace
 */
export const Status = Callable({
  [Callable.symbol]: <Code extends Status['statusCode']>(statusCode: Code, statusMessage: Status['statusMessage']) =>
    ({
      statusCode,
      statusMessage,
    }) satisfies Status,
  ...TObject({
    /**
     * Standard HTTP status code integer
     */
    statusCode: Int,

    /**
     * Standard HTTP status message
     */
    statusMessage: string,
  }),
});

export interface Status extends Type.TypeOf<typeof Status> {}
