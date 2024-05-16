export function compare(left: boolean, right: boolean): number {
  return left === right ? 0 : left < right ? -1 : 1;
}
