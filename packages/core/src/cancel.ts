import type { TaskCanceler } from './task.js';

/**
 * Trigger cancelation once
 *
 * @example
 * ```ts
 * const canceler: Canceler = { current: () => { console.log('cancel'); } };
 * cancel(canceler);// console.log('cancel');
 * cancel(canceler);// do nothing
 * ```
 * @param canceler
 */
export function cancel(canceler: TaskCanceler) {
  const { current } = canceler;
  if (current != null) {
    canceler.current = undefined;
    current();
  }
}
