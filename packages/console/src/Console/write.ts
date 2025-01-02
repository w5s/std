/* eslint-disable no-console */
import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

export function write(
  method: 'debug' | 'log' | 'info' | 'warn' | 'error',
  message: [required: unknown, ...optionalParameters: unknown[]],
): Task<void, never> {
  return taskFrom(({ resolve }) => resolve(console[method](...message)));
}
