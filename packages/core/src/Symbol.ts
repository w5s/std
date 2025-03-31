/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

const GlobalSymbol = globalThis.Symbol;
const __symbolAlias = <K extends keyof globalThis.SymbolConstructor>(name: K): globalThis.SymbolConstructor[K] =>
  GlobalSymbol[name] ?? (GlobalSymbol.for(`Symbol.${name}`) as any);

/**
 * A collection of well known symbols
 *
 */
export namespace Symbol {
  /**
   * A method that returns the default iterator for an object. Called by the semantics of the for-of statement.
   */
  export const iterator: typeof GlobalSymbol.iterator = __symbolAlias('iterator');
  export type iterator = typeof iterator;

  /**
   * A method that returns the default async iterator for an object. Called by the semantics of the for-await-of statement.
   */
  export const asyncIterator: typeof GlobalSymbol.asyncIterator = __symbolAlias('asyncIterator');
  export type asyncIterator = typeof asyncIterator;

  /**
   * A method that determines if a constructor object recognizes an object as one of the constructor’s instances. Called by the semantics of the instanceof operator.
   */
  export const hasInstance: typeof GlobalSymbol.hasInstance = __symbolAlias('hasInstance');
  export type hasInstance = typeof hasInstance;

  /**
   * A Boolean value that if true indicates that an object should flatten to its array elements by Array.prototype.concat.
   */
  export const isConcatSpreadable: typeof GlobalSymbol.isConcatSpreadable = __symbolAlias('isConcatSpreadable');
  export type isConcatSpreadable = typeof isConcatSpreadable;

  /**
   * A regular expression method that matches the regular expression against a string. Called by the String.prototype.match method.
   */
  export const match: typeof GlobalSymbol.match = __symbolAlias('match');
  export type match = typeof match;

  /**
   * A regular expression method that matches the regular expression against a string. Called by the String.prototype.matchAll method.
   */
  export const matchAll: typeof GlobalSymbol.matchAll = __symbolAlias('matchAll');
  export type matchAll = typeof matchAll;

  /**
   * A regular expression method that replaces matched substrings of a string. Called by the String.prototype.replace method.
   */
  export const replace: typeof GlobalSymbol.replace = __symbolAlias('replace');
  export type replace = typeof replace;

  /**
   * A regular expression method that replaces matched substrings of a string. Called by the String.prototype.replace method.
   */
  export const search: typeof GlobalSymbol.search = __symbolAlias('search');
  export type search = typeof search;

  /**
   * A function valued property that is the constructor function that is used to create derived objects.
   */
  export const species: typeof GlobalSymbol.species = __symbolAlias('species');
  export type species = typeof species;

  /**
   * A regular expression method that splits a string at the indices that match the regular expression. Called by the String.prototype.split method.
   */
  export const split: typeof GlobalSymbol.split = __symbolAlias('split');
  export type split = typeof split;

  /**
   * A String value that is used in the creation of the default string description of an object. Called by the built-in method Object.prototype.toString.
   */
  export const toStringTag: typeof GlobalSymbol.toStringTag = __symbolAlias('toStringTag');
  export type toStringTag = typeof toStringTag;

  /**
   * A method that converts an object to a corresponding primitive value. Called by the ToPrimitive abstract operation.
   */
  export const toPrimitive: typeof GlobalSymbol.toPrimitive = __symbolAlias('toPrimitive');
  export type toPrimitive = typeof toPrimitive;

  /**
   * An Object whose truthy properties are properties that are excluded from the 'with' environment bindings of the associated objects.
   */
  export const unscopables: typeof GlobalSymbol.unscopables = __symbolAlias('unscopables');
  export type unscopables = typeof unscopables;

  /**
   * A method that is used to release resources held by an object. Called by the semantics of the using statement.
   */
  export const dispose: typeof GlobalSymbol.dispose = __symbolAlias('dispose');
  export type dispose = typeof dispose;

  /**
   * A method that is used to asynchronously release resources held by an object. Called by the semantics of the await using statement.
   */
  export const asyncDispose: typeof GlobalSymbol.asyncDispose = __symbolAlias('asyncDispose');
  export type asyncDispose = typeof asyncDispose;

  // NodeJS

  /**
   * NodeJS inspect symbol used by `util.inspect()`
   */
  export const nodeInspect: unique symbol = GlobalSymbol.for('nodejs.util.inspect.custom') as any;
  export type nodeInspect = typeof nodeInspect;

  // W5S symbols

  /**
   * Call signature
   */
  export const call = '__call__'; // GlobalSymbol.for('w5s.call') as any;
  export type call = typeof call;

  /**
   * Enum keys
   */
  export const enumKeys: unique symbol = GlobalSymbol.for('w5s.enumKeys') as any;
  export type enumKeys = typeof enumKeys;

  /**
   * Task run effect
   */
  export const run: unique symbol = GlobalSymbol.for('w5s.run') as any;
  export type run = typeof run;
}
