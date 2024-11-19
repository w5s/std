import type { Type } from '@w5s/core';
import { Callable } from '@w5s/core/dist/Callable.js';
import { Array as TArray } from '@w5s/core/dist/Type/Array.js';
import { TObject } from '@w5s/core/dist/Type/Object.js';
import { string } from '@w5s/core/dist/Type/string.js';
import { union } from '@w5s/core/dist/Type/union.js';
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
