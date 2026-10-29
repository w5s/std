import type { Ref } from '@w5s/core';

import { useShadowStorage } from '@w5s/shadow-storage';

import type { Meta } from './meta.js';
import type { State } from './State.js';

import { useRef } from './useRef.js';

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
  return useRef(store ?? useShadowStorage(globalThis), meta.name, initialState);
}
