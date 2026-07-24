import type { LogLevel } from './LogLevel.js';
import type { LogLevelValue } from './LogLevel/LogLevelValue.js';
import type { LogMessageItem } from './LogMessage.js';
import type { LogRecord } from './LogRecord.js';

import { from as logLevelFrom } from './LogLevel/from.js';
import { create as logMessageCreate } from './LogMessage/create.js';

export interface LogLevelFactory {
  (
    strings: TemplateStringsArray,
    ...referencesInput: Array<null | ReferenceInput | string | undefined>
  ): LogLevelParameters;
  withData(data: LogRecord['data']): LogLevelFactory;
}

export interface LogLevelParameters extends Pick<LogRecord, 'data' | 'level' | 'message'> {}

type ReferenceInput = [string, unknown];

/**
 * Return a function that creates params to be used with a logger function
 *
 * @example
 * ```typescript
 * level(LogLevel.Debug)`debug message`;// { level: LogLevel.Debug, message: LogMessage('debug message'), ... }
 * level('debug')`debug message`; // { level: LogLevel.Debug, message: LogMessage('debug message'), ... }
 * level('debug')`foo=${['foo', 'foo_value']}`; // { ..., message: LogMessage('foo=', LogMessageRef('foo)), data: { foo: 'foo_value' } }
 * level('debug').withData({ someData: true })`debug message`;// { level: LogLevel.Critical, message: LogMessage(...), data: { someData: true } }
 * ```
 * @param logLevel the default message level
 * @returns a new logger params factory
 */
export function level(logLevel: LogLevel | LogLevelValue): LogLevelFactory {
  return levelWithData(typeof logLevel === 'string' ? logLevelFrom(logLevel) : logLevel, {});
}

function levelWithData(logLevel: LogLevel, baseData: LogRecord['data']): LogLevelFactory {
  return Object.assign(
    (strings: TemplateStringsArray, ...tokens: Array<null | ReferenceInput | string | undefined>) => {
      const message: Array<LogMessageItem> = [strings[0]!];
      const data: Record<string, unknown> = { ...baseData };
      for (const [index, token] of tokens.entries()) {
        if (token != null) {
          if (typeof token === 'string') {
            message.push(token);
          } else {
            const [key, value] = token;
            message.push({ $ref: key });
            data[key] = value;
          }
        }
        message.push(strings[index + 1]!);
      }

      return {
        data,
        level: logLevel,
        message: logMessageCreate(message),
      };
    },
    {
      withData(data: LogRecord['data']): LogLevelFactory {
        return levelWithData(logLevel, { ...baseData, ...data });
      },
    },
  );
}

/**
 * `Critical` string template
 *
 * @example
 * critical`My message ${['foo', fooValue]}`
 * critical.withData({ baz: true })`My message ${['foo', fooValue]}`
 */
export const critical = level('critical');

/**
 * `Error` string template
 *
 * @example
 * error`My message ${['foo', fooValue]}`
 * error.withData({ baz: true })`My message ${['foo', fooValue]}`
 */
export const error = level('error');

/**
 * `Warning` string template
 *
 * @example
 * warn`My message ${['foo', fooValue]}`
 * warn.withData({ baz: true })`My message ${['foo', fooValue]}`
 */
export const warn = level('warn');

/**
 * `Info` string template
 *
 * @example
 * info`My message ${['foo', fooValue]}`
 * info.withData({ baz: true })`My message ${['foo', fooValue]}`
 */
export const info = level('info');

/**
 * `Debug` string template
 *
 * @example
 * debug`My message ${['foo', fooValue]}`
 * debug.withData({ baz: true })`My message ${['foo', fooValue]}`
 */
export const debug = level('debug');
