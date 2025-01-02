import type { Task } from '@w5s/task';
import { write } from './write.js';

/**
 * Display a message in console with `error` level
 *
 * @example
 * ```typescript
 * Task.unsafeRun(Console.error('Hello', 'World !'));// > Hello World !
 * ```
 * @param parameters - an array of values to be logged
 */
export function error(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
  return write('error', parameters);
}
