const state = new WeakMap<Iterable<unknown>, ReturnType<typeof useSeqState<any>>>();

/**
 * @internal
 */
export interface SeqState<T> {
  currentIterator: Iterator<T> | undefined;
  resolvedValues: Array<T>;
}

/**
 * @param iterable
 * @internal
 * @example
 */
export function useSeqState<T>(iterable: Iterable<T>): SeqState<T> {
  if (typeof iterable === 'string') {
    return {
      currentIterator: undefined,
      resolvedValues: [...iterable],
    };
  }

  let returnValue = state.get(iterable);
  if (returnValue === undefined) {
    returnValue = Array.isArray(iterable)
      ? {
          currentIterator: undefined,
          resolvedValues: iterable as Array<T>,
        }
      : {
          currentIterator: iterable[Symbol.iterator](),
          resolvedValues: [],
        };
    state.set(iterable, returnValue);
  }
  return returnValue;
}
