/* eslint-disable unicorn/custom-error-definition */
/* eslint-disable max-classes-per-file */
/* eslint-disable prefer-destructuring */

export interface ErrorOptions {
  /**
   * The cause of the error
   */
  cause?: unknown;
}

/**
 * Alias to native {@link globalThis.Error}
 *
 * @example
 * ```ts
 * import { Error } from '@w5s/error';
 *
 * throw new Error('my message', { cause: someError });
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class Error {
  /**
   * Error name
   */
  name: 'Error';

  /**
   * Error message
   */
  message: string;

  /**
   * Error stack description (when supported)
   */
  stack?: string;

  /**
   * Error cause
   */
  cause?: unknown;

  /**
   * Error constructor
   *
   * @param message - the error message
   * @param options - the error options
   */
  constructor(message?: string, options?: ErrorOptions);
}
// @ts-ignore Ignore duplicate
export declare function Error(message?: string, options?: ErrorOptions): Error;

// @ts-ignore Ignore duplicate
export const Error: typeof Error = globalThis.Error;

/**
 * Alias to native {@link globalThis.AggregateError}
 *
 * @example
 * ```ts
 * import { AggregateError } from '@w5s/error';
 *
 * try {
 *   throw new AggregateError([new Error("some error")], "Hello");
 * } catch (e) {
 *   console.log(e instanceof AggregateError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "AggregateError"
 *   console.log(e.errors); // [ Error: "some error" ]
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class AggregateError<Errors extends any[] | Iterable<any>> extends Error {
  name: 'AggregateError';

  /**
   * Array of error
   */
  errors: Errors extends any[] ? Array<[...Errors]> : Errors extends Iterable<infer T> ? Array<T> : never;

  /**
   * AggregateError constructor
   *
   * @param errors - an iterable of error
   * @param message - the error message
   */
  constructor(errors: Errors, message?: string);
}
// @ts-ignore Ignore duplicate
export declare function AggregateError(errors: Iterable<any>, message?: string): AggregateError;
// @ts-ignore Ignore duplicate
export const AggregateError = globalThis.AggregateError;

/**
 * Alias to native {@link globalThis.EvalError}
 *
 * @example
 * ```ts
 * import { EvalError } from '@w5s/error';
 *
 * try {
 *   throw new EvalError("Hello");
 * } catch (e) {
 *   console.log(e instanceof RangeEvalErrorError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "EvalError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class EvalError extends Error {
  name: 'EvalError';
}
// @ts-ignore Ignore duplicate
export declare function EvalError(message?: string, options?: ErrorOptions): EvalError;
// @ts-ignore Ignore duplicate
export const EvalError = globalThis.EvalError;

/**
 * Alias to native {@link globalThis.RangeError}
 *
 * @example
 * ```ts
 * import { RangeError } from '@w5s/error';
 *
 * try {
 *   throw new RangeError("Hello");
 * } catch (e) {
 *   console.log(e instanceof RangeError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "RangeError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class RangeError extends Error {
  name: 'RangeError';
}
// @ts-ignore Ignore duplicate
export declare function RangeError(message?: string, options?: ErrorOptions): RangeError;
// @ts-ignore Ignore duplicate
export const RangeError = globalThis.RangeError;

/**
 * Alias to native {@link globalThis.ReferenceError}
 *
 * @example
 * ```ts
 * import { ReferenceError } from '@w5s/error';
 *
 * try {
 *   throw new ReferenceError("Hello");
 * } catch (e) {
 *   console.log(e instanceof ReferenceError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "ReferenceError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class ReferenceError extends Error {
  name: 'ReferenceError';
}
// @ts-ignore Ignore duplicate
export declare function ReferenceError(message?: string, options?: ErrorOptions): ReferenceError;
// @ts-ignore Ignore duplicate
export const ReferenceError = globalThis.ReferenceError;

/**
 * Alias to native {@link globalThis.SyntaxError}
 *
 * @example
 * ```ts
 * import { SyntaxError } from '@w5s/error';
 *
 * try {
 *   throw new SyntaxError("Hello");
 * } catch (e) {
 *   console.log(e instanceof SyntaxError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "SyntaxError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class SyntaxError extends Error {
  name: 'SyntaxError';
}
// @ts-ignore Ignore duplicate
export declare function SyntaxError(message?: string, options?: ErrorOptions): SyntaxError;
// @ts-ignore Ignore duplicate
export const SyntaxError = globalThis.SyntaxError;

/**
 * Alias to native {@link globalThis.URIError}
 *
 * @example
 * ```ts
 * import { URIError } from '@w5s/error';
 *
 * try {
 *   throw new URIError("Hello");
 * } catch (e) {
 *   console.log(e instanceof URIError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "URIError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class URIError extends Error {
  name: 'URIError';
}
// @ts-ignore Ignore duplicate
export declare function URIError(message?: string, options?: ErrorOptions): URIError;
// @ts-ignore Ignore duplicate
export const URIError = globalThis.URIError;

/**
 * Alias to native {@link globalThis.TypeError}
 *
 * @example
 * ```ts
 * import { TypeError } from '@w5s/error';
 *
 * try {
 *   throw new TypeError("Hello");
 * } catch (e) {
 *   console.log(e instanceof TypeError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "TypeError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class TypeError extends Error {
  name: 'TypeError';
}
// @ts-ignore Ignore duplicate
export declare function TypeError(message?: string, options?: ErrorOptions): TypeError;
// @ts-ignore Ignore duplicate
export const TypeError = globalThis.TypeError;
