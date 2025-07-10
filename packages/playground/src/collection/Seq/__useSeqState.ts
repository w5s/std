const state = new WeakMap<Iterable<unknown>, ReturnType<typeof __useSeqState<any>>>();

/**
 * @internal
 */
export type SeqState<T> = {
  resolvedValues: Array<T>;
  currentIterator: Iterator<T> | undefined;
};

/**
 * @internal
 * @example
 */
export function __useSeqState<T>(iterable: Iterable<T>): SeqState<T> {
  if (typeof iterable === 'string') {
    return {
      resolvedValues: [...iterable],
      currentIterator: undefined,
    };
  }

  let returnValue = state.get(iterable);
  if (returnValue === undefined) {
    returnValue = Array.isArray(iterable)
      ? {
          resolvedValues: iterable as Array<T>,
          currentIterator: undefined,
        }
      : {
          resolvedValues: [],
          currentIterator: iterable[Symbol.iterator](),
        };
    state.set(iterable, returnValue);
  }
  return returnValue;
}
