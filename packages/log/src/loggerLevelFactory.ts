/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LoggerParameters } from './LoggerParameters.js';
import type { LogLevel } from './LogLevel.js';
import type { LogMessageItem } from './LogMessage.js';

type ReferenceInput = [string, unknown] | { [key: string]: unknown };

/**
 * Return a function that creates params to be used with a logger function
 *
 * @example
 * @param level - the default message level
 * @returns a new logger params factory
 */
export function loggerLevelFactory(
  level: LogLevel,
): (
  strings: TemplateStringsArray,
  ...referencesInput: Array<undefined | null | string | ReferenceInput>
) => LoggerParameters {
  return (strings, ...tokens) => {
    const message: LogMessageItem[] = [strings[0]!];
    const data: Record<string, unknown> = {};
    for (const [index, token] of tokens.entries()) {
      if (token != null) {
        if (typeof token === 'string') {
          message.push(token);
        } else if (Array.isArray(token)) {
          const [key, value] = token;
          message.push({ $ref: key });
          data[key] = value;
        } else {
          // do nothing
          for (const refName of Object.keys(token)) {
            message.push({ $ref: refName });
          }
          Object.assign(data, token);
        }
      }
      message.push(strings[index + 1]!);
    }

    return LoggerParameters({
      level,
      message,
      data,
    });
  };
}
