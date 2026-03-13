import { useRef } from './useRef.js';
import { useStorage } from '@w5s/global-storage';
import type { Ref } from '@w5s/core';
import type { State } from './State.js';

export function useNamespace(
  name: string | { name: string },
  store?: Ref<State>,
): Ref<State> {
  const initialState = Object.freeze({});
  const key = typeof name === 'string' ? name : name.name;
  return useRef(store == null ? useStorage(globalThis) : store, key, initialState);
}
