import type { Option, Ref } from '@w5s/core';
import { Ref as createRef } from '@w5s/core/dist/Ref.js';

/**
 * Interface used to cancel running task (internal)
 */
export interface TaskCanceler extends Ref<Option<() => void>> {}

export function TaskCanceler(): TaskCanceler {
  return createRef(undefined);
}
