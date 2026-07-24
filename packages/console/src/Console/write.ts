import type { Task } from '@w5s/task';

import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

export function write(
  method: 'debug' | 'error' | 'info' | 'log' | 'warn',
  message: [required: unknown, ...optionalParameters: Array<unknown>],
): Task<void, never> {
  return taskFrom(({ resolve }) => resolve(console[method](...message)));
}
