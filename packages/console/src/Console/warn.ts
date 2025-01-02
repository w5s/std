import type { Task } from '@w5s/task';
import { write } from './write.js';

/**
 * Display a message in console with `warn` level
 *
 * @example
 * ```typescript
 * Task.unsafeRun(Console.warn('Hello', 'World !'));// > Hello World !
 * ```
 * @param parameters - an array of values to be logged
 */
export function warn(...parameters: [required: unknown, ...optionalParameters: unknown[]]): Task<void, never> {
  return write('warn', parameters);
}
