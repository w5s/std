import type { FiberCallback } from './FiberCallback.js';
import type { FiberResult } from './FiberResult.js';
import { Scheduler } from './Scheduler.js';

export function run<T>(fn: FiberCallback<T>): FiberResult<T> {
  const result = Scheduler.spawn(fn);
  Scheduler.resume(result.id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
}
