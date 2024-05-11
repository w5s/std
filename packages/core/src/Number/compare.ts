export function compare(left: number, right: number): number {
  return left === right ? 0 : left < right ? -1 : 1;
}
