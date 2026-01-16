import type { Option, Ref } from '@w5s/core';
import { Ref as createRef } from '@w5s/core/dist/Ref.js';

/**
 * Interface used to cancel running task (internal)
 */
export interface TaskCanceler extends Ref<Option<() => void>> {
  cancel: () => void;
}

export function TaskCanceler(): TaskCanceler {
  // @ts-ignore Add cancel method to Ref
  const ref: TaskCanceler = createRef(undefined);
  ref.cancel = () => {
    const { current } = ref;
    if (current != null) {
      ref.current = undefined;
      current();
    }
  };
  return ref;
}
