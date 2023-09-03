export interface LogMessage extends ReadonlyArray<LogMessage.Item> {}

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

/**
 * @namespace
 */
export const LogMessage = {
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
  create(parts: Array<LogMessage.Item>): LogMessage {
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
  },
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
  of(...parts: Array<LogMessage.Item>): LogMessage {
    return LogMessage.create(parts);
  },

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
  data(message: LogMessage): { [key: string]: unknown } {
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
  },
};
