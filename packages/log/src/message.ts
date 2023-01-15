export interface LogMessage extends ReadonlyArray<LogMessage.Item> {}

/**
 * Construct LogMessage
 *
 * @example
 * ```ts
 * const message = LogMessage(['foo', LogMessage.Ref('key', 'value'), 'bar']);
 * ```
 * @category Constructor
 * @param parts - constructor parameters
 */
export function LogMessage(parts: Array<LogMessage.Item>): LogMessage {
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
export namespace LogMessage {
  export interface Ref<V = unknown> {
    /**
     * Reference name
     */
    readonly logRefName: string;

    /**
     * Reference value
     */
    readonly logRefValue: V;
  }

  /**
   * Construct Ref
   *
   * @example
   * ```ts
   * const ref = LogMessage.Ref('name', 'value'); { refName: 'name', refValue: 'value' }
   * ```
   * @param name - the reference name
   * @param value - the reference value
   */
  export function Ref<Value>(name: string, value: Value): Ref<Value> {
    return { logRefName: name, logRefValue: value };
  }

  /**
   * Item type
   */
  export type Item = string | Ref;

  /**
   * Return an object of all refs
   *
   * @example
   * ```ts
   * const message = LogMessage(['foo', LogMessage.Ref('key', 'value'), 'bar']);
   * LogMessage.data(message);// { key: 'value' }
   * ```
   * @param message - the message
   */
  export function data(message: LogMessage): { [key: string]: unknown } {
    const returnValue: { [key: string]: unknown } = {};

    for (let index = 0; index < message.length; index += 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const part = message[index]!;
      if (typeof part !== 'string') {
        returnValue[part.logRefName] = part.logRefValue;
      }
    }

    return returnValue;
  }
}
