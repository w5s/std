import { isPromiseLike } from './isPromiseLike.js';

/**
 * Return `true` if `anyValue` is a {@link Promise}
 *
 * @example
 * ```typescript
 * isPromise(Promise.resolve());// true
 * isPromise({ then() {} });// false
 * isPromise(null);// false
 * ```
 * @category Type
 * @param anyValue
 */
export function isPromise(anyValue: unknown): anyValue is Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return isPromiseLike(anyValue) && typeof (anyValue as any).catch === 'function';
}
