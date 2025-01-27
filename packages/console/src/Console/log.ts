import type { Task } from '@w5s/task';
import { write } from './write.js';

/**
 * Display a message in console with `log` level
 *
 * @example
 * ```typescript
 * Task.run(Console.log('Hello', 'World !'));// > Hello World !
 * ```
 * @param parameters - an array of values to be logged
 */
export function log(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
  return write('log', parameters);
}
