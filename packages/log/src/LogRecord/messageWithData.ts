import type { LogRecord } from './LogRecord.js';

/**
 * Return an array of message parts from the log record's message,
 * replacing any data references with their corresponding values in the log record's data object.
 *
 * @example
 * ```ts
 * const record = LogRecord({
 *   message: LogMessage(['foo=', { $ref: 'foo' }]),
 *   data: {
 *     foo: 'foo_value',
 *   },
 * });
 * LogRecord.messageWithData(record);// ['foo=', 'foo_value']
 * ```
 * @param self
 */
export function messageWithData(self: LogRecord): Array<unknown> {
  return self.message.map((part) => (typeof part === 'string' ? part : self.data[part.$ref]));
}
