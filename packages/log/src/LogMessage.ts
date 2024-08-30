import type { Type } from '@w5s/core';
import { Array as TArray } from '@w5s/core/dist/Type/Array.js';
import { string } from '@w5s/core/dist/Type/string.js';
import { Tuple } from '@w5s/core/dist/Type/Tuple.js';
import { union } from '@w5s/core/dist/Type/union.js';
import { unknown } from '@w5s/core/dist/Type/unknown.js';

/**
 * @namespace
 */
export const LogMessageItem = union(string, Tuple(string, unknown));

export type LogMessageItem = Type.TypeOf<typeof LogMessageItem>;

/**
 * Construct LogMessage
 *
 * @example
 * ```ts
 * const message = LogMessage.create(['foo', ['key', 'value'], 'bar']);
 * ```
 * @category Constructor
 * @param parts - constructor parameters
 */
function create(parts: Array<LogMessage.Item>): LogMessage {
  /* eslint-disable unicorn/no-for-loop */

  const returnValue = [];
  let buffer = '';
  for (let index = 0; index < parts.length; index += 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const value = parts[index]!;
    if (typeof value === 'string') {
      buffer += value;
    } else {
      if (buffer.length > 0) {
        returnValue.push(buffer);
        buffer = '';
      }
      returnValue.push(value);
    }
  }
  if (buffer.length > 0) {
    returnValue.push(buffer);
  }

  return returnValue;
}

/**
 * Construct LogMessage from arguments
 *
 * @example
 * ```ts
 * const message = LogMessage.of('foo', ['key', 'value'], 'bar');
 * ```
 * @category Constructor
 * @param parts - constructor parameters
 */
function of(...parts: Array<LogMessage.Item>): LogMessage {
  return create(parts);
}

/**
 * Return an object of all refs
 *
 * @example
 * ```ts
 * const message = LogMessage.of('foo', ['key', 'value'], 'bar');
 * LogMessage.data(message);// { key: 'value' }
 * ```
 * @param message - the message
 */
function data(message: LogMessage): { [key: string]: unknown } {
  const returnValue: { [key: string]: unknown } = {};

  for (let index = 0; index < message.length; index += 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const part = message[index]!;
    if (typeof part !== 'string') {
      const [name, value] = part;
      returnValue[name] = value;
    }
  }

  return returnValue;
}

/**
 * @namespace
 */
export const LogMessage = { ...TArray(LogMessageItem), create, of, data };

export interface LogMessage extends Type.TypeOf<typeof LogMessage> {}

// export interface LogMessage extends ReadonlyArray<LogMessage.Item> {}

export namespace LogMessage {
  /**
   * A variable reference
   */
  export type Variable<V = unknown> = [name: string, value: V];

  /**
   * Item type
   */
  export type Item = string | Variable;
}
