/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
const GlobalSymbol = globalThis.Symbol;
const __symbolAlias = <K extends keyof globalThis.SymbolConstructor>(name: K): globalThis.SymbolConstructor[K] =>
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  GlobalSymbol[name] ?? (GlobalSymbol.for(`Symbol.${name}`) as any);

// W5S symbols

const call = '__call__' as const; // GlobalSymbol.for('w5s.call') as any;
const inspect = '__inspect__' as const; // GlobalSymbol.for('w5s.inspect') as any;
const encode = '__encode__' as const; // GlobalSymbol.for('w5s.encode') as any;
const decode = '__decode__' as const; // GlobalSymbol.for('w5s.decode') as any;
const schema = '__schema__' as const; // GlobalSymbol.for('w5s.schema') as any;
const enumKeys = '__enumKeys__' as const; // GlobalSymbol.for('w5s.enumKeys') as SymbolConstructor['w5s.enumKeys'];
const run = '__run__' as const; // GlobalSymbol.for('w5s.run') as any;

/**
 * A collection of well known symbols
 *
 * @namespace
 */
export const Symbol = {
  /**
   * A method that returns the default iterator for an object. Called by the semantics of the for-of statement.
   */
  iterator: __symbolAlias('iterator') as SymbolConstructor['iterator'],
  /**
   * A method that returns the default async iterator for an object. Called by the semantics of the for-await-of statement.
   */
  asyncIterator: __symbolAlias('asyncIterator') as SymbolConstructor['asyncIterator'],
  /**
   * A method that determines if a constructor object recognizes an object as one of the constructor’s instances. Called by the semantics of the instanceof operator.
   */
  hasInstance: __symbolAlias('hasInstance') as SymbolConstructor['hasInstance'],
  /**
   * A Boolean value that if true indicates that an object should flatten to its array elements by Array.prototype.concat.
   */
  isConcatSpreadable: __symbolAlias('isConcatSpreadable') as SymbolConstructor['isConcatSpreadable'],
  /**
   * A regular expression method that matches the regular expression against a string. Called by the String.prototype.match method.
   */
  match: __symbolAlias('match') as SymbolConstructor['match'],
  /**
   * A regular expression method that matches the regular expression against a string. Called by the String.prototype.matchAll method.
   */
  matchAll: __symbolAlias('matchAll') as SymbolConstructor['matchAll'],
  /**
   * A regular expression method that replaces matched substrings of a string. Called by the String.prototype.replace method.
   */
  replace: __symbolAlias('replace') as SymbolConstructor['replace'],
  /**
   * A regular expression method that replaces matched substrings of a string. Called by the String.prototype.replace method.
   */
  search: __symbolAlias('search') as SymbolConstructor['search'],
  /**
   * A function valued property that is the constructor function that is used to create derived objects.
   */
  species: __symbolAlias('species') as SymbolConstructor['species'],
  /**
   * A regular expression method that splits a string at the indices that match the regular expression. Called by the String.prototype.split method.
   */
  split: __symbolAlias('split') as SymbolConstructor['split'],
  /**
   * A String value that is used in the creation of the default string description of an object. Called by the built-in method Object.prototype.toString.
   */
  toStringTag: __symbolAlias('toStringTag') as SymbolConstructor['toStringTag'],
  /**
   * A method that converts an object to a corresponding primitive value. Called by the ToPrimitive abstract operation.
   */
  toPrimitive: __symbolAlias('toPrimitive') as SymbolConstructor['toPrimitive'],
  /**
   * An Object whose truthy properties are properties that are excluded from the 'with' environment bindings of the associated objects.
   */
  unscopables: __symbolAlias('unscopables') as SymbolConstructor['unscopables'],
  /**
   * A method that is used to release resources held by an object. Called by the semantics of the using statement.
   */
  dispose: __symbolAlias('dispose') as SymbolConstructor['dispose'],
  /**
   * A method that is used to asynchronously release resources held by an object. Called by the semantics of the await using statement.
   */
  asyncDispose: __symbolAlias('asyncDispose') as SymbolConstructor['asyncDispose'],

  /**
   * Call signature
   */
  call,

  /**
   * NodeJS Inspect callback
   */
  inspect,

  /**
   * Encode property symbol
   *
   * @see {@link Codec}
   */
  encode,
  /**
   * Decode property symbol
   *
   * @see {@link Codec}
   */
  decode,
  /**
   * Schema property symbol
   *
   * @see {@link Codec}
   */
  schema,
  /**
   * Enum keys
   */
  enumKeys,
  /**
   * Task run effect
   */
  run,
};
/**
 * A collection of well known symbols
 *
 */
export namespace Symbol {
  export type iterator = typeof Symbol.iterator;
  export type asyncIterator = typeof Symbol.asyncIterator;
  export type hasInstance = typeof Symbol.hasInstance;
  export type isConcatSpreadable = typeof Symbol.isConcatSpreadable;
  export type match = typeof Symbol.match;
  export type matchAll = typeof Symbol.matchAll;
  export type replace = typeof Symbol.replace;
  export type search = typeof Symbol.search;
  export type species = typeof Symbol.species;
  export type split = typeof Symbol.split;
  export type toStringTag = typeof Symbol.toStringTag;
  export type toPrimitive = typeof Symbol.toPrimitive;
  export type unscopables = typeof Symbol.unscopables;
  export type dispose = typeof Symbol.dispose;
  export type asyncDispose = typeof Symbol.asyncDispose;

  // NodeJS

  // W5S symbols
  export type call = typeof Symbol.call;
  export type inspect = typeof Symbol.inspect;
  export type encode = typeof Symbol.encode;
  export type decode = typeof Symbol.decode;
  export type schema = typeof Symbol.schema;
  export type enumKeys = typeof Symbol.enumKeys;
  export type run = typeof Symbol.run;
}
