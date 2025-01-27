import type { Task } from '@w5s/task';
import { write } from './write.js';

/**
 * Display a message in console with `debug` level
 *
 * @example
 * ```typescript
 * Task.run(Console.debug('Hello', 'World !'));// > Hello World !
 * ```
 * @param parameters - an array of values to be logged
 */
export function debug(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
  return write('debug', parameters);
}
