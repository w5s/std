import type { Type } from '@w5s/core/Type';
import { Callable } from '@w5s/core/Callable';
import { Array as TArray } from '@w5s/core/Type/Array';
import { TObject } from '@w5s/core/Type/Object';
import { string } from '@w5s/core/Type/string';
import { union } from '@w5s/core/Type/union';
import { create } from './LogMessage/create.js';
import { of } from './LogMessage/of.js';

/**
 * @namespace
 */
export const LogMessageRef = Callable({
  [Callable.symbol]: (name: string): LogMessageRef => ({ $ref: name }),
  ...TObject({
    $ref: string,
  }),
});
export type LogMessageRef = Type.TypeOf<typeof LogMessageRef>;

/**
 * @namespace
 */
export const LogMessageItem = union(string, LogMessageRef);

export type LogMessageItem = Type.TypeOf<typeof LogMessageItem>;

/**
 * @namespace
 */
export const LogMessage = Callable({
  [Callable.symbol]: of,
  ...TArray(LogMessageItem),
  create,
  of,
});

export interface LogMessage extends Type.TypeOf<typeof LogMessage> {}
