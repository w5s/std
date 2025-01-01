const _empty = Object.freeze({});

/**
 * Returns an empty {@link Headers} object
 *
 * @example
 * ```typescript
 * const response = Response({
 *   headers: Headers.empty(),
 * });
 * ```
 */
export function empty() {
  return _empty;
}
