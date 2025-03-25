/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { asString } from './CustomError/asString.js';

type CustomErrorRequiredProperties = {
  name: string;
};

/**
 * A Standard extendable error type
 */
export type CustomError<Properties extends CustomErrorRequiredProperties = CustomErrorRequiredProperties> = Readonly<
  globalThis.Error & {
    /**
     * Error name (used as tag)
     */
    name: Properties['name'];
    /**
     * Error message
     */
    message: string;
    /**
     * Stack trace
     */
    stack: string;
    /**
     * Optional `Error` that was thrown
     */
    cause: unknown;
  } & Properties
>;

interface CustomErrorConstructor /* extends ErrorConstructor */ {
  /**
   * New operator
   */
  new <Properties extends CustomErrorRequiredProperties>(properties: Properties): CustomError<Properties>;
  /**
   * Call operator
   */
  <Properties extends CustomErrorRequiredProperties>(properties: Properties): CustomError<Properties>;
  readonly prototype: CustomError;
  /**
   * Static method to convert an error to a string
   *
   * @example
   * ```typescript
   * CustomError.asString(new Error('my message'));
   * ```
   * @param self
   */
  asString(self: Error): string;
}

/**
 * Return a new `CustomError`
 *
 * @example
 * ```typescript
 * const parentError: Error;
 * const error = new CustomError({
 *   name: 'FooError' as const, // this is required
 *   message: 'my custom message', // customize message (optional)
 *   cause: parentError, // Error that caused this error (optional)
 * })
 * ```
 * @category Constructor
 * @param properties - initial properties
 */
export const CustomError: CustomErrorConstructor = (() => {
  const __assign = Object.assign;
  const __create = Object.create;

  function CustomError<Properties extends { name: string; message?: string; cause?: unknown }>(
    this: any,
    properties: Properties,
  ): CustomError<Properties> {
    interface MutableError extends Error {
      [extra: string]: unknown;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-argument
    const returnValue: MutableError = new.target ? (this as MutableError) : __create(CustomError.prototype);

    // Assign default properties from prototype
    returnValue.message = returnValue.message;
    returnValue.name = returnValue.name;
    returnValue.cause = returnValue.cause;
    // Assign properties
    __assign(returnValue, properties);

    // Capture stack trace
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(returnValue, returnValue.constructor);
    }

    return returnValue as CustomError<Properties>;
  }

  return __assign(CustomError, {
    asString,
    prototype: __assign(__create(Error.prototype), {
      constructor: CustomError,
      message: '',
      cause: undefined,
      toString(this: Error) {
        return asString(this);
      },
    }),
  }) as CustomErrorConstructor;
})();
