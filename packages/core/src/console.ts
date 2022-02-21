/* eslint-disable no-console */
import { Task } from './task.js';

export namespace Console {
  type Parameters = [required: unknown, ...optionalParameters: unknown[]];

  function createTask(
    method: 'debug' | 'log' | 'info' | 'warn' | 'error',
    message: Parameters
  ): Task.Sync<void, never> {
    return Task.Sync(({ ok }) => {
      console[method](...message);

      return ok(undefined);
    });
  }

  /**
   * Display a message in console with `debug` level
   *
   * @example
   * ```typescript
   * runTask(Console.debug('Hello', 'World !'));// > Hello World !
   * ```
   *
   * @param parameters
   */
  export function debug(...parameters: Parameters): Task.Sync<void, never> {
    return createTask('debug', parameters);
  }

  /**
   * Display a message in console with `log` level
   *
   * @example
   * ```typescript
   * runTask(Console.log('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters
   */
  export function log(...parameters: Parameters): Task.Sync<void, never> {
    return createTask('log', parameters);
  }

  /**
   * Display a message in console with `info` level
   *
   * @example
   * ```typescript
   * runTask(Console.info('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters
   */
  export function info(...parameters: Parameters): Task.Sync<void, never> {
    return createTask('info', parameters);
  }

  /**
   * Display a message in console with `warn` level
   *
   * @example
   * ```typescript
   * runTask(Console.warn('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters
   */
  export function warn(...parameters: Parameters): Task.Sync<void, never> {
    return createTask('warn', parameters);
  }

  /**
   * Display a message in console with `error` level
   *
   * @example
   * ```typescript
   * runTask(Console.error('Hello', 'World !'));// > Hello World !
   * ```
   * @param parameters
   */
  export function error(...parameters: Parameters): Task.Sync<void, never> {
    return createTask('error', parameters);
  }
}
