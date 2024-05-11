export function compare(left: string, right: string): number {
  return left === right ? 0 : left < right ? -1 : 1;
}
