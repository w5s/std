/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// https://github.com/tc39/proposal-explicit-resource-management

const GlobalSymbol = globalThis.Symbol;

export interface SymbolConstructor
  extends Omit<globalThis.SymbolConstructor, 'keyFor' | 'for' | 'prototype' | 'metadata'> {
  /**
   * Enum keys
   */
  readonly enumKeys: unique symbol;

  /**
   * Enum values
   */
  readonly enumValues: unique symbol;
}

/**
 * A collection of well known symbols
 *
 * @namespace
 */
export const Symbol: SymbolConstructor = {
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
  enumKeys: GlobalSymbol.for('@w5s/enumKeys') as SymbolConstructor['enumKeys'],
  enumValues: GlobalSymbol.for('@w5s/enumValues') as SymbolConstructor['enumValues'],
};
