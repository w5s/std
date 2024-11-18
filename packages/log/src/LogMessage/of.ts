import type { LogMessage, LogMessageItem } from '../LogMessage.js';
import { create } from './create.js';

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
export function of(...parts: Array<LogMessageItem>): LogMessage {
  return create(parts);
}
