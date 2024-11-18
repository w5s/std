import type { LogRecord } from './LogRecord.js';

export interface LoggerParameters extends Pick<LogRecord, 'level' | 'message' | 'data'> {
  /**
   * Add `extraData` to current data
   *
   * @param extraData
   */
  withData(extraData: LoggerParameters['data']): LoggerParameters;
}
/**
 * Return a new logger params
 *
 * @example
 * ```ts
 * const loggerParameters = LoggerParameters({
 *   level: LogLevel.Critical,
 *   message: ['foo=', { $ref: 'foo' }],
 *   data: { foo: 'foo_value' },
 * }); // { ..., data: { foo: 'foo_value' } }
 * const loggerParametersWithData = loggerParameters.withData({
 *   bar: 'bar_value',
 * }); // { ..., data: { foo: 'foo_value', bar: 'bar_value' } }
 * ```
 * @param parameters
 */
export function LoggerParameters(parameters: Omit<LoggerParameters, 'withData'>): LoggerParameters {
  const { data, ...other } = parameters;
  return {
    ...other,
    data,
    withData(extraData) {
      return LoggerParameters({
        ...other,
        data: {
          ...data,
          ...extraData,
        },
      });
    },
  };
}
