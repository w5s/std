const _empty = Object.freeze({});

/**
 * Returns an empty {@link Headers} object
 *
 * @example
 * ```ts
 * const response = Response({
 *   headers: Headers.empty(),
 * });
 * ```
 */
export function empty() {
  return _empty;
}
