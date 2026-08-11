/* eslint-disable ts/no-unsafe-argument */
/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable ts/no-unsafe-assignment */
/* eslint-disable ts/no-shadow */

import { asString } from './CustomError/asString.js';
import { isError } from './isError.js';

/**
 * A Standard extendable error type
 */
export type CustomError<Properties extends CustomErrorRequiredProperties = CustomErrorRequiredProperties> = Readonly<
  globalThis.Error & Properties & {
    /**
     * Optional `Error` that was thrown
     */
    cause: unknown;

    /**
     * Error message
     */
    message: string;

    /**
     * Error name (used as tag)
     */
    name: Properties['name'];

    /**
     * Stack trace
     */
    stack: string;
  }
>;

interface CustomErrorConstructor /* extends ErrorConstructor */ {
  /**
   * Error name
   */
  readonly errorName: string;

  /**
   * New operator
   */
  new<Properties extends CustomErrorRequiredProperties>(properties: Properties): CustomError<Properties>;

  /**
   * Call operator
   */
  <Properties extends CustomErrorRequiredProperties>(properties: Properties): CustomError<Properties>;

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

  /**
   * Return true if anyValue is an instance of current class
   *
   * @param this
   * @param anyValue any value to test
   */
  hasInstance<Class extends abstract new (...args: any) => any>(
    this: Class,
    anyValue: unknown,
  ): anyValue is InstanceType<Class>;

  readonly prototype: CustomError;
}

interface CustomErrorRequiredProperties {
  name: string;
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
 * @param properties initial properties
 */
export const CustomError: CustomErrorConstructor = (() => {
  const errorName = 'CustomError';
  const objectAssign = Object.assign;
  const objectCreate = Object.create;
  type CaptureStackTrace = (targetObject: object, constructorOpt?: () => void) => void;

  const captureStackTrace: CaptureStackTrace = (Error as any).captureStackTrace ?? ((_targetObject: object, _constructorOpt?: () => void) => {});

  function CustomError<Properties extends { cause?: unknown; message?: string; name: string }>(
    this: any,
    properties: Properties,
  ): CustomError<Properties> {
    // eslint-disable-next-line ts/consistent-indexed-object-style
    interface MutableError extends Error {
      [extra: string]: unknown;
    }

    const returnValue: MutableError = new.target ? (this as MutableError) : objectCreate(CustomError.prototype);

    // Assign default properties from prototype
    returnValue.message = returnValue.message;
    returnValue.name = returnValue.name;
    returnValue.cause = returnValue.cause;

    // Assign properties
    objectAssign(returnValue, properties);

    // Capture stack trace
    captureStackTrace(returnValue, returnValue.constructor as any);

    return returnValue as CustomError<Properties>;
  }

  return objectAssign(CustomError, {
    asString,
    errorName,
    hasInstance(anyValue: unknown): boolean {
      return isError(anyValue) && anyValue.name === this.errorName;
    },
    prototype: objectAssign(objectCreate(Error.prototype), {
      cause: undefined,
      constructor: CustomError,
      message: '',
      name: errorName,
      toString(this: Error) {
        return asString(this);
      },
    }),
  }) as CustomErrorConstructor;
})();
