/* eslint-disable @typescript-eslint/no-unnecessary-condition */

const GlobalSymbol = globalThis.Symbol;

declare global {
  interface SymbolForMap {
    readonly 'w5s.enumKeys': unique symbol;
    readonly 'w5s.toFunction': unique symbol;
    readonly 'nodejs.util.inspect.custom': unique symbol;
  }
  interface SymbolConstructor {
    for<K extends keyof SymbolForMap>(key: K): SymbolForMap[K];
  }
}

export interface SymbolConstructor extends Omit<globalThis.SymbolConstructor, 'keyFor' | 'prototype' | 'metadata'> {
  /**
   * Enum keys
   */
  readonly enumKeys: SymbolForMap['w5s.enumKeys'];

  /**
   * Callable callback
   */
  readonly toFunction: '__toFunction__'; // TODO: unique symbol;

  /**
   * NodeJS inspect symbol
   */
  readonly nodeInspect: SymbolForMap['nodejs.util.inspect.custom'];
}

/**
 * A collection of well known symbols
 *
 * @namespace
 */
export const Symbol: SymbolConstructor = {
  for: GlobalSymbol.for,
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
  toFunction: '__toFunction__', // GlobalSymbol.for('w5s.toFunction') as SymbolConstructor['toFunction'],
  enumKeys: GlobalSymbol.for('w5s.enumKeys'),
  nodeInspect: GlobalSymbol.for('nodejs.util.inspect.custom'),
};
