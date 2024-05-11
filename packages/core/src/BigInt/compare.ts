export function compare(left: bigint, right: bigint): number {
  return left === right ? 0 : left < right ? -1 : 1;
}
