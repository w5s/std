/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { ImmediateId } from './ImmediateId.js';

const __clearImmediate: (id: any) => void =
  globalThis.clearImmediate == null
    ? (id: any) => globalThis.clearTimeout(id)
    : (id: any) => Number(globalThis.clearImmediate(id));

/**
 * A polyfill for {@link clearImmediate}
 *
 * @example
 * ```typescript
 * const id = setImmediate(() => { ... });
 * clearImmediate(id);// This will cancel the call
 * ```
 * @param id - the id returned by `setImmediate`
 */
export function clearImmediate(id: ImmediateId): void {
  return __clearImmediate(id);
}
