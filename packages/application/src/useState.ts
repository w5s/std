import type { Ref } from '@w5s/core';
import { useNamespace } from './useNamespace.js';
import { useRef } from './useRef.js';
import type { State } from './State.js';
import type { StateKey } from './StateKey.js';

export function useState<T>(name: string | { name: string }, key: StateKey, initial: T, store?: Ref<State>): Ref<T> {
  const namespace = useNamespace(name, store);
  const state = useRef(namespace, 'state', Object.freeze({}));
  return useRef(state, key, initial);
}
