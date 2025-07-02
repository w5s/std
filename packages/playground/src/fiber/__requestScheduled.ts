/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { Tag } from '@w5s/core-type';

const __setImmediate =
  globalThis.setImmediate == null
    ? (fn: () => void) => globalThis.setTimeout(fn, 0)
    : (fn: () => void) => globalThis.setImmediate(fn);
const __clearImmediate: (id: any) => void =
  globalThis.clearImmediate == null
    ? (id: any) => globalThis.clearTimeout(id)
    : (id: any) => globalThis.clearImmediate(id);
const __now = () => Date.now();

/**
 * An api that behaves like {@link IdleDeadline}
 */
export interface ScheduledDeadline {
  timeRemaining(): number;
}

export interface ScheduledRequestCallback {
  (api: ScheduledDeadline): void;
}

export type ScheduledRequestId = number & Tag<'ScheduledRequestId'>;

export function __requestScheduled(fn: ScheduledRequestCallback, deadlineMs: number): ScheduledRequestId {
  return __setImmediate(() => {
    const startTime = __now();
    const deadlineTime = startTime + Math.max(deadlineMs, 0);
    fn({
      timeRemaining() {
        return deadlineTime - __now();
      },
    });
  }) as unknown as ScheduledRequestId;
}

export function __cancelScheduled(id: ScheduledRequestId): void {
  return __clearImmediate(id);
}
