import { describe, expect, it } from 'vitest';
import { combine } from './combine.js';
import { String } from '../String.js';
import { Number } from '../Number.js';
import { Ordering } from '../Ordering.js';

describe(combine, () => {
  interface Person {
    lastName: string;
    firstName: string;
    age: number;
  }

  it('combine two orders', () => {
    const compare = combine(
      (left: Person, right: Person) => String.compare(left.firstName, right.firstName),
      (left: Person, right: Person) => Number.compare(left.age, right.age),
    );

    expect(compare({ lastName: '', firstName: 'Alice', age: 25 }, { lastName: '', firstName: 'Bob', age: 30 })).toBe(
      Ordering.Less,
    );
    expect(compare({ lastName: '', firstName: 'Alice', age: 25 }, { lastName: '', firstName: 'Alice', age: 25 })).toBe(
      Ordering.Equal,
    );
    expect(compare({ lastName: '', firstName: 'Alice', age: 25 }, { lastName: '', firstName: 'Alice', age: 26 })).toBe(
      Ordering.Less,
    );
  });
  it('combine three orders', () => {
    const compare = combine(
      (left: Person, right: Person) => String.compare(left.lastName, right.lastName),
      (left: Person, right: Person) => String.compare(left.firstName, right.firstName),
      (left: Person, right: Person) => Number.compare(left.age, right.age),
    );
    const self = { lastName: 'B', firstName: 'Alice', age: 25 };

    expect(compare(self, self)).toBe(Ordering.Equal);
    expect(compare({ ...self, lastName: 'A' }, { ...self, lastName: 'B' })).toBe(Ordering.Less);
    expect(compare({ ...self, firstName: 'A' }, { ...self, firstName: 'B' })).toBe(Ordering.Less);
  });
});
