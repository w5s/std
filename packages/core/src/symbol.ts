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
     * Object storage property.
     */
    readonly storage: unique symbol;
  }
}
const GlobalSymbol = globalThis.Symbol;

/**
 * A collection of well known symbols
 *
 * @namespace
 */
export const Symbol: Omit<SymbolConstructor, 'keyFor' | 'for' | 'prototype' | 'metadata'> = {
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
  storage: GlobalSymbol.for('@w5s/storage') as SymbolConstructor['storage'],
};
