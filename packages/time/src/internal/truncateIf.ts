/**
 * @param value
 * @param truncate
 * @internal
 * @example
 */
export function truncateIf(value: number, truncate: boolean): number {
  return truncate ? Math.trunc(value) : value;
}
