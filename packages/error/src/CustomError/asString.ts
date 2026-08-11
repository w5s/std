// eslint-disable-next-line ts/unbound-method
const errorToString = Error.prototype.toString;

/**
 * Static method to convert an error to a string
 *
 * @example
 * ```typescript
 * CustomError.asString(new Error('my message'));
 * ```
 * @param self
 */
export function asString(self: Error): string {
  // eslint-disable-next-line ts/no-unsafe-argument
  return errorToString.call(self) + (self.cause == null ? '' : `\n  └ ${asString(self.cause as any)}`);
}
