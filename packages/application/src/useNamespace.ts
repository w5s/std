import { useRef } from './useRef.js';
import { useStorage } from '@w5s/global-storage';
import type { Ref } from '@w5s/core';
import type { State } from './State.js';
import type { Meta } from './Meta.js';

/**
 * Return a new `Ref` containing the namespace for the given `meta.name`.
 *
 * @example
 * ```typescript
 * const app = { name: 'my-app' };
 * const namespace = useNamespace(app);
 * namespace.current == {
 *   ...namespace.current,
 *   configuration: {},
 *   state: {},
 * };
 * ```
 * @param meta the meta info containing the name
 * @param store
 */
export function useNamespace(
  meta: Meta,
  store?: Ref<State>,
): Ref<State> {
  const initialState = Object.freeze({});
  return useRef(store == null ? useStorage(globalThis) : store, meta.name, initialState);
}
