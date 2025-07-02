import type { FiberCallback } from '../FiberCallback.js';
import type { FiberResult } from '../FiberResult.js';
import { __scheduler } from '../__scheduler.js';

export function run<T>(fn: FiberCallback<T>): FiberResult<T> {
  const result = __scheduler.spawn(fn);
  __scheduler.resume(result.id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
}
