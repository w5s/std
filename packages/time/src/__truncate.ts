// eslint-disable-next-line jsdoc/require-example
/**
 * @internal
 */
export function __truncate(value: number, truncate: boolean): number {
  return truncate ? Math.trunc(value) : value;
}
