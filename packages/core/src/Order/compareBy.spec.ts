// packages/core/src/Order/compareBy.spec.ts
import { describe, it, expect } from 'vitest';
import { compareBy } from './compareBy.js';
import { String } from '../String.js';
import { withOrder } from '../Testing/withOrder.js';

describe(compareBy, () => {
  const expectOrder = withOrder(expect);

  interface Person {
    name: string;
    age: number;
  }

  it('returns a function that compares two values through the selectFn', async () => {
    const compareByName = compareBy((person: Person) => person.name, String.compare);

    expectOrder(compareByName).toSortValues([
      { name: 'Alice', age: 25 },
      { name: 'Alice', age: 26 },
      { name: 'Bob', age: 30 },
      { name: 'Bob', age: 31 },
    ]);
  });
  it('uses .compare when comparable', async () => {
    const compareByName = compareBy((person: Person) => person.name, String);

    expectOrder(compareByName).toSortValues([
      { name: 'Alice', age: 25 },
      { name: 'Alice', age: 26 },
      { name: 'Bob', age: 30 },
      { name: 'Bob', age: 31 },
    ]);
  });
});
