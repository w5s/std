import { Iterable } from '@w5s/iterable';

export function main(): void {
  const values = ['a', 'b', 'c'];
  const upper = Iterable.map(values, (x) => x.toUpperCase());
  const withDash = Iterable.flatMap(upper, (x) => [x, '-']);

  console.log([...withDash]); // "A-B-C-"
}
