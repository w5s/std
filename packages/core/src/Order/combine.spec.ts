import { describe, expect, it } from 'vitest';

import type { Ordering } from '../Ordering.js';

import { String } from '../String.js';
import { withOrder } from '../Testing.js';
import { combine } from './combine.js';

describe(combine, () => {
  const numberCompare = (a: number, b: number): Ordering => (a === b ? 0 : a < b ? -1 : 1);
  const expectOrder = withOrder(expect);
  interface Person {
    age: number;
    firstName: string;
    lastName: string;
  }

  it('combine two orders', () => {
    const compare = combine(
      (left: Person, right: Person) => String.compare(left.firstName, right.firstName),
      (left: Person, right: Person) => numberCompare(left.age, right.age),
    );

    expectOrder(compare).toSortValues([
      { age: 25, firstName: 'Alice', lastName: 'A' },
      { age: 25, firstName: 'Alice', lastName: 'B' },
      { age: 26, firstName: 'Alice', lastName: 'B' },
      { age: 25, firstName: 'Bob', lastName: 'A' },
      { age: 25, firstName: 'Bob', lastName: 'B' },
    ]);
  });
  it('combine three orders', () => {
    const compare = combine(
      (left: Person, right: Person) => String.compare(left.lastName, right.lastName),
      (left: Person, right: Person) => String.compare(left.firstName, right.firstName),
      (left: Person, right: Person) => numberCompare(left.age, right.age),
    );
    expectOrder(compare).toSortValues([
      { age: 25, firstName: 'Alice', lastName: 'A' },
      { age: 25, firstName: 'Alice', lastName: 'B' },
      { age: 26, firstName: 'Alice', lastName: 'B' },
      { age: 25, firstName: 'Bob', lastName: 'B' },
      { age: 25, firstName: 'Bob', lastName: 'B' },
    ]);
  });
});
