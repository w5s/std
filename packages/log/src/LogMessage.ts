import type { Type } from '@w5s/core';
import { Callable } from '@w5s/core/dist/Callable.js';
import { Array as TArray } from '@w5s/core/dist/Type/Array.js';
import { constant } from '@w5s/core/dist/Type/constant.js';
import { Record } from '@w5s/core/dist/Type/Record.js';
import { string } from '@w5s/core/dist/Type/string.js';
import { union } from '@w5s/core/dist/Type/union.js';
import { create } from './LogMessage/create.js';
import { of } from './LogMessage/of.js';

/**
 * @namespace
 */
export const LogMessageItemRef = Callable({
  [Callable.symbol]: (value: string): LogMessageItemRef => ({ $ref: value }),
  ...Record(constant('$ref'), string),
});
export type LogMessageItemRef = Type.TypeOf<typeof LogMessageItemRef>;

/**
 * @namespace
 */
export const LogMessageItem = union(string, LogMessageItemRef);

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
