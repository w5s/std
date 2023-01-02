/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// https://github.com/tc39/proposal-explicit-resource-management

declare global {
  interface SymbolConstructor {
    /**
     * Disposes of resources within this object.
     */
    readonly dispose: unique symbol;

    /**
     * Disposes asynchronously of resources within this object.
     */
    readonly asyncDispose: unique symbol;

    /**
     * Global storage property.
     */
    readonly globalStorage: unique symbol;
  }
}
const GlobalSymbol = globalThis.Symbol;

export const Symbol: Omit<SymbolConstructor, 'keyFor' | 'for' | 'prototype'> = {
  iterator: GlobalSymbol.iterator,
  asyncIterator: GlobalSymbol.asyncIterator,
  hasInstance: GlobalSymbol.hasInstance,
  isConcatSpreadable: GlobalSymbol.isConcatSpreadable,
  match: GlobalSymbol.match,
  replace: GlobalSymbol.replace,
  search: GlobalSymbol.search,
  species: GlobalSymbol.species,
  split: GlobalSymbol.split,
  toStringTag: GlobalSymbol.toStringTag,
  toPrimitive: GlobalSymbol.toPrimitive,
  unscopables: GlobalSymbol.unscopables,
  matchAll: GlobalSymbol.matchAll,
  dispose: GlobalSymbol.dispose ?? (GlobalSymbol.for('dispose') as any),
  asyncDispose: GlobalSymbol.asyncDispose ?? (GlobalSymbol.for('asyncDispose') as any),
  globalStorage: GlobalSymbol.for('@w5s/globalStorage') as SymbolConstructor['globalStorage'],
};
