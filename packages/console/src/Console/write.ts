import type { Task } from '@w5s/task/Task';
import { from as taskFrom } from '@w5s/task/Task/from';

export function write(
  method: 'debug' | 'log' | 'info' | 'warn' | 'error',
  message: [required: unknown, ...optionalParameters: unknown[]],
): Task<void, never> {
  return taskFrom(({ resolve }) => resolve(console[method](...message)));
}
