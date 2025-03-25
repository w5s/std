/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/custom-error-definition */

import { CustomError } from './CustomError.js';
import { isError } from './isError.js';

export type ErrorType<Name extends string, Properties> = CustomError<
  {
    name: Name;
  } & Properties
>;

/**
 * Return a new `Error` default factory
 * See {@link ErrorClass} for additional properties added to the constructor
 *
 * @example
 * ```typescript
 * export class MyError extends ErrorClass({
 *   errorName: 'MyError',
 *   // errorMessage: 'my message',
 * })<{
 *   foo: boolean;
 * }> {};
 *
 * const instance = MyError({ foo: true, message: 'hey!' }); // Error { name: 'MyError', message: 'hey!', foo: true }
 * MyError.errorName === 'MyError' // true
 * MyError.hasInstance(instance); // true
 * ```
 * @param options - the options for the new error type
 */
export function ErrorClass<Name extends string>(options: ErrorClassOptions<Name>): ErrorClass<Name> {
  const { errorName, errorMessage } = options;
  class BaseError extends CustomError<{ name: Name }> {}
  (BaseError as any).errorName = errorName;
  (BaseError as any).hasInstance = (anyValue: unknown) => isError(anyValue) && anyValue.name === errorName;
  Object.assign(BaseError.prototype as any, {
    name: errorName,
    message: errorMessage,
  });
  // @ts-ignore
  return BaseError;
}

export interface ErrorClassOptions<Name extends string> {
  /**
   * Error name
   */
  errorName: Name;
  /**
   * Default error message
   */
  errorMessage?: string;
}

export interface ErrorClass<Name extends string> {
  /**
   * Return true if anyValue is an instance of current class
   *
   * @param this
   * @param anyValue - any value to test
   */
  hasInstance<Class extends abstract new (...args: any) => any>(
    this: Class,
    anyValue: unknown,
  ): anyValue is InstanceType<Class>;
  /**
   * Error name
   */
  readonly errorName: Name;
  /**
   * Error constructor
   */
  new <Properties extends Record<string, any> = {}>(
    ...properties: ErrorClassParameters<Properties>
  ): ErrorType<Name, Properties>;
}

/**
 * Extract all parameters to create a new CustomError
 */
export type ErrorClassParameters<Properties extends object> =
  RequiredKeysOf<Omit<Properties, 'name' | 'stack' | 'message' | 'cause'>> extends never
    ? [properties?: ErrorClassProperties<Properties>]
    : [properties: ErrorClassProperties<Properties>];

/**
 * Extract all properties passed to constructor
 */
export type ErrorClassProperties<Properties extends object> = Omit<
  Properties,
  'name' | 'stack' | 'message' | 'cause'
> & {
  /**
   * Optional message, if omitted default one will be used
   */
  message?: string;
  /**
   * Optional cause
   */
  cause?: unknown;
};

// TODO: move this to library
type RequiredKeysOf<T extends object> = Exclude<
  {
    [Key in keyof T]: T extends Record<Key, T[Key]> ? Key : never;
  }[keyof T],
  undefined
>;
