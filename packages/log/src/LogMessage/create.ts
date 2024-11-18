import type { LogMessage, LogMessageItem } from '../LogMessage.js';

/**
 * Construct LogMessage
 *
 * @example
 * ```ts
 * const message = LogMessage.create(['foo', { $ref: 'key' }, 'bar']);
 * ```
 * @category Constructor
 * @param parts - constructor parameters
 */
export function create(parts: Array<LogMessageItem>): LogMessage {
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
