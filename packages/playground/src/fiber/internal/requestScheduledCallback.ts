import { setImmediate } from '@w5s/async/dist/setImmediate.js';
import { clearImmediate } from '@w5s/async/dist/clearImmediate.js';
import type { ImmediateId } from '@w5s/async';

const performanceNow = globalThis.performance == null ? () => Date.now() : () => performance.now();

/**
 * An api that behaves like {@link IdleDeadline}
 */
export interface ScheduledDeadline {
  timeRemaining(): number;
}

export interface ScheduledRequestCallback {
  (api: ScheduledDeadline): void;
}

export type ScheduledRequestId = ImmediateId;

export function requestScheduledCallback(callback: ScheduledRequestCallback, deadlineMs: number): ScheduledRequestId {
  return setImmediate(() => {
    const startTime = performanceNow();
    const deadlineTime = startTime + Math.max(deadlineMs, 0);
    callback({
      timeRemaining() {
        return deadlineTime - performanceNow();
      },
    });
  }) as unknown as ScheduledRequestId;
}

export function cancelScheduledCallback(id: ScheduledRequestId): void {
  return clearImmediate(id);
}
