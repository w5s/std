import type { ExpectFunction } from '@w5s/core-type';

export interface ExpectIterable {
  toHaveValues(expected: Array<unknown>): void;
  toBeIdemPotent(): void;
}

export function withIterable(expectFn: ExpectFunction) {
  const create = <V>(iterable: Iterable<V>, _isNot: boolean): ExpectIterable => ({
    toHaveValues(expected: Array<unknown>) {
      expectFn(Array.from(iterable)).toEqual(Array.from(expected));
    },
    toBeIdemPotent() {
      expectFn(Array.from(iterable)).toEqual(Array.from(iterable));
    },
  });
  return <V>(iterable: Iterable<V>) =>
    Object.assign(create(iterable, false), {
      not: create(iterable, true),
    });
}
