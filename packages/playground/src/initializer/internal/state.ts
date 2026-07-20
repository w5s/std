import { Ref } from '@w5s/core/dist/Ref.js';
import { useGlobal } from '@w5s/global-storage';
import type { Initializer } from '../Initializer.js';
import { InitializerStatus } from '../InitializerStatus.js';
import { meta } from '../meta.js';

export const state = useGlobal(meta.name, () => Ref<Record<Initializer['id'], InitializerStatus>>({}));

export function getStatus(initializer: Initializer): InitializerStatus {
  return state.current[initializer.id] ?? InitializerStatus.Stopped;
}

export function setStatus(initializer: Initializer, statusValue: InitializerStatus): void {
  state.current = {
    ...state.current,
    [initializer.id]: statusValue,
  };
}
