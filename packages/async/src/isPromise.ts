import { isPromiseLike } from './isPromiseLike.js';

export function isPromise(anyValue: unknown): anyValue is Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return isPromiseLike(anyValue) && typeof (anyValue as any).catch === 'function';
}
