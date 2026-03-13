import type { Ref } from '@w5s/core';
import { useNamespace } from './useNamespace.js';
import { useRef } from './useRef.js';
import type { State } from './State.js';
import type { StateKey } from './StateKey.js';
import type { Meta } from './meta.js';

/**
 * Return a new `Ref` containing the state for the given `meta.name` and `key`.
 *
 * @example
 * ```typescript
 * const app = { name: 'my-app' };
 * const counterRef = useState(app, 'counter', 1);
 * counterRef.current += 1;
 * ```
 * @param meta the meta info containing the name
 * @param key the key of the state
 * @param initial the initial value of the state
 * @param store the store containing the state, default to global storage
 */
export function useState<T>(meta: Meta, key: StateKey, initial: T, store?: Ref<State>): Ref<T> {
  const namespace = useNamespace(meta, store);
  const state = useRef(namespace, 'state', Object.freeze({}));
  return useRef(state, key, initial);
}
