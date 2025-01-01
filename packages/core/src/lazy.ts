/**
 * Returns the result of `getValue`, that will be called once.
 * Useful for expensive computation
 *
 * @example
 * ```typescript
 * const expensiveRead = lazy(() => fs.readDirSync('my/dir'));
 * // fs.readDirSync not called
 * console.log(
 *   expensiveRead() // <- fs.readDirSync called, return value is put in cache
 * );
 * console.log(
 *   expensiveRead() // <- fs.readDirSync not called, return value from cache
 * );
 * ```
 * @param getValue - the computation
 */
export function lazy<T>(getValue: () => T): () => T {
  let defined = false;
  let value: T;
  return () => {
    if (!defined) {
      defined = true;
      value = getValue();
    }

    return value;
  };
}
