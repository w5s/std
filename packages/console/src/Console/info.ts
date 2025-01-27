import type { Task } from '@w5s/task';
import { write } from './write.js';

/**
 * Display a message in console with `info` level
 *
 * @example
 * ```typescript
 * Task.run(Console.info('Hello', 'World !'));// > Hello World !
 * ```
 * @param parameters - an array of values to be logged
 */
export function info(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
  return write('info', parameters);
}
