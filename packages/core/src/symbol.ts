/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// https://github.com/tc39/proposal-explicit-resource-management

declare global {
  interface SymbolConstructor {
    readonly dispose: unique symbol;
    readonly asyncDispose: unique symbol;
  }
}

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

  export const dispose: typeof GlobalSymbol.dispose = GlobalSymbol.dispose ?? (GlobalSymbol.for('dispose') as unknown);

  export const asyncDispose: typeof GlobalSymbol.asyncDispose =
    GlobalSymbol.asyncDispose ?? (GlobalSymbol.for('asyncDispose') as unknown);
}

export interface Disposable {
  /**
   * Disposes of resources within this object.
   */
  [Symbol.dispose](): void;
}

export interface AsyncDisposable {
  /**
   * Disposes of resources within this object.
   */
  [Symbol.asyncDispose](): Promise<void>;
}
