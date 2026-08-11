const state = new WeakMap<object, SeqState<unknown>>();

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

  let returnValue = state.get(iterable as object) as SeqState<T> | undefined;
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
    state.set(iterable as object, returnValue);
  }
  return returnValue;
}
