/* eslint-disable @typescript-eslint/no-unnecessary-condition */
export namespace Symbol {
  const GlobalSymbol = globalThis.Symbol;

  export const {
    iterator,
    asyncIterator,
    hasInstance,
    isConcatSpreadable,
    match,
    replace,
    search,
    species,
    split,
    toStringTag,
    toPrimitive,
    unscopables,
  } = globalThis.Symbol;

  /**
   * Disposes of resources within this object.
   */
  export const dispose: typeof GlobalSymbol.dispose = GlobalSymbol.dispose ?? (GlobalSymbol.for('dispose') as unknown);

  /**
   * Disposes asynchronously of resources within this object.
   */
  export const asyncDispose: typeof GlobalSymbol.asyncDispose =
    GlobalSymbol.asyncDispose ?? (GlobalSymbol.for('asyncDispose') as unknown);
}
