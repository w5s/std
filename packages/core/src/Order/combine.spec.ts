import { describe, expect, it } from 'vitest';
import { combine } from './combine.js';
import { String } from '../String.js';
import { withOrder } from '../Testing.js';

describe(combine, () => {
  const numberCompare = (a: number, b: number): Ordering => (a === b ? 0 : a < b ? -1 : 1);
  const expectOrder = withOrder(expect);
  interface Person {
    lastName: string;
    firstName: string;
    age: number;
  }

  it('combine two orders', () => {
    const compare = combine(
      (left: Person, right: Person) => String.compare(left.firstName, right.firstName),
      (left: Person, right: Person) => numberCompare(left.age, right.age),
    );

    expectOrder(compare).toSortValues([
      { lastName: 'A', firstName: 'Alice', age: 25 },
      { lastName: 'B', firstName: 'Alice', age: 25 },
      { lastName: 'B', firstName: 'Alice', age: 26 },
      { lastName: 'A', firstName: 'Bob', age: 25 },
      { lastName: 'B', firstName: 'Bob', age: 25 },
    ]);
  });
  it('combine three orders', () => {
    const compare = combine(
      (left: Person, right: Person) => String.compare(left.lastName, right.lastName),
      (left: Person, right: Person) => String.compare(left.firstName, right.firstName),
      (left: Person, right: Person) => numberCompare(left.age, right.age),
    );
    expectOrder(compare).toSortValues([
      { lastName: 'A', firstName: 'Alice', age: 25 },
      { lastName: 'B', firstName: 'Alice', age: 25 },
      { lastName: 'B', firstName: 'Alice', age: 26 },
      { lastName: 'B', firstName: 'Bob', age: 25 },
      { lastName: 'B', firstName: 'Bob', age: 25 },
    ]);
  });
});
