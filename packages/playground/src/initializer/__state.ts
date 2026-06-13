import { Ref } from '@w5s/core/Ref';
import { useGlobalValue } from '@w5s/global-storage';
import type { Initializer } from './Initializer.js';
import { InitializerStatus } from './InitializerStatus.js';
import { meta } from './meta.js';

export const __state = useGlobalValue(meta.name, () => Ref<Record<Initializer['id'], InitializerStatus>>({}));

export function getStatus(initializer: Initializer): InitializerStatus {
  return __state.current[initializer.id] ?? InitializerStatus.Stopped;
}

export function setStatus(initializer: Initializer, statusValue: InitializerStatus): void {
  __state.current = {
    ...__state.current,
    [initializer.id]: statusValue,
  };
}
