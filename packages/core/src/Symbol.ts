/* eslint-disable @typescript-eslint/no-unnecessary-condition */

const GlobalSymbol = globalThis.Symbol;
const __symbolAlias = <K extends keyof globalThis.SymbolConstructor>(name: K): globalThis.SymbolConstructor[K] =>
  GlobalSymbol[name] ?? (GlobalSymbol.for(name) as any);

declare global {
  interface SymbolFor {
    readonly 'w5s.enumKeys': unique symbol;
    // readonly 'w5s.call': unique symbol;
    readonly 'nodejs.util.inspect.custom': unique symbol;
  }
  interface SymbolConstructor {
    for<K extends keyof SymbolFor>(key: K): SymbolFor[K];
  }
}

export interface SymbolConstructor extends Omit<globalThis.SymbolConstructor, 'keyFor' | 'prototype' | 'metadata'> {
  /**
   * NodeJS inspect symbol
   */
  readonly nodeInspect: SymbolFor['nodejs.util.inspect.custom'];

  /**
   * Enum keys
   */
  readonly enumKeys: SymbolFor['w5s.enumKeys'];

  /**
   * Callable callback
   */
  readonly call: '__call__'; // TODO: SymbolFor['w5s.call'];
}

/**
 * A collection of well known symbols
 *
 * @namespace
 */
export const Symbol: SymbolConstructor = {
  for: GlobalSymbol.for,
  // Global symbols
  iterator: __symbolAlias('iterator'),
  asyncIterator: __symbolAlias('asyncIterator'),
  hasInstance: __symbolAlias('hasInstance'),
  isConcatSpreadable: __symbolAlias('isConcatSpreadable'),
  match: __symbolAlias('match'),
  replace: __symbolAlias('replace'),
  search: __symbolAlias('search'),
  species: __symbolAlias('species'),
  split: __symbolAlias('split'),
  toStringTag: __symbolAlias('toStringTag'),
  toPrimitive: __symbolAlias('toPrimitive'),
  unscopables: __symbolAlias('unscopables'),
  matchAll: __symbolAlias('matchAll'),
  dispose: __symbolAlias('dispose'),
  asyncDispose: __symbolAlias('asyncDispose'),
  // NodeJS symbols
  nodeInspect: GlobalSymbol.for('nodejs.util.inspect.custom'),
  // W5S symbols
  call: '__call__', // TODO: GlobalSymbol.for('w5s.call'),
  enumKeys: GlobalSymbol.for('w5s.enumKeys'),
};
