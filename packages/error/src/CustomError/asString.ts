// eslint-disable-next-line @typescript-eslint/unbound-method
const errorToString = Error.prototype.toString;

/**
 * Static method to convert an error to a string
 *
 * @example
 * ```ts
 * CustomError.asString(new Error('my message'));
 * ```
 * @param self
 */
export function asString(self: Error): string {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return errorToString.call(self) + (self.cause == null ? '' : `\n  └ ${String(self.cause)}`);
}
