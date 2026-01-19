import type { Option } from '@w5s/core';

/**
 * Interface used to cancel running task (internal)
 */
export class TaskCanceler {
  /**
   * Cancel event callback
   */
  onCancel?: Option<() => void>;

  /**
   * Cancel by running callback, then unsetting it
   *
   * @example
   * ```typescript
   * const canceler = new TaskCanceler();
   * canceler.cancel();
   * ```
   */
  cancel(): void {
    const { onCancel } = this;
    if (onCancel != null) {
      this.onCancel = undefined;
      onCancel();
    }
  }
}
