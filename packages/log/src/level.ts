/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { LogLevel } from './LogLevel.js';
import type { LogMessageItem } from './LogMessage.js';
import type { LogRecord } from './LogRecord.js';
import { create as logMessageCreate } from './LogMessage/create.js';
import { from as logLevelFrom } from './LogLevel/from.js';
import type { LogLevelValue } from './LogLevel/LogLevelValue.js';

type ReferenceInput = [string, unknown];

export interface LogLevelParameters extends Pick<LogRecord, 'level' | 'message' | 'data'> {}

export interface LogLevelFactory {
  (
    strings: TemplateStringsArray,
    ...referencesInput: Array<undefined | null | string | ReferenceInput>
  ): LogLevelParameters;
  withData(data: LogRecord['data']): LogLevelFactory;
}

function levelWithData(logLevel: LogLevel, baseData: LogRecord['data']): LogLevelFactory {
  return Object.assign(
    (strings: TemplateStringsArray, ...tokens: Array<undefined | null | string | ReferenceInput>) => {
      const message: LogMessageItem[] = [strings[0]!];
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
        level: logLevel,
        message: logMessageCreate(message),
        data,
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
 * Return a function that creates params to be used with a logger function
 *
 * @example
 * ```ts
 * level(LogLevel.Debug)`debug message`;// { level: LogLevel.Debug, message: LogMessage('debug message'), ... }
 * level('debug')`debug message`; // { level: LogLevel.Debug, message: LogMessage('debug message'), ... }
 * level('debug')`foo=${['foo', 'foo_value']}`; // { ..., message: LogMessage('foo=', LogMessageRef('foo)), data: { foo: 'foo_value' } }
 * level('debug').withData({ someData: true })`debug message`;// { level: LogLevel.Critical, message: LogMessage(...), data: { someData: true } }
 * ```
 * @param logLevel - the default message level
 * @returns a new logger params factory
 */
export function level(logLevel: LogLevelValue | LogLevel): LogLevelFactory {
  return levelWithData(typeof logLevel === 'string' ? logLevelFrom(logLevel) : logLevel, {});
}
