// packages/core/src/Order/compareBy.spec.ts
import { describe, expect, it } from 'vitest';

import { String } from '../String.js';
import { withOrder } from '../Testing/withOrder.js';
import { compareBy } from './compareBy.js';

describe(compareBy, () => {
  const expectOrder = withOrder(expect);

  interface Person {
    age: number;
    name: string;
  }

  it('returns a function that compares two values through the selectFn', async () => {
    const compareByName = compareBy((person: Person) => person.name, String.compare);

    expectOrder(compareByName).toSortValues([
      { age: 25, name: 'Alice' },
      { age: 26, name: 'Alice' },
      { age: 30, name: 'Bob' },
      { age: 31, name: 'Bob' },
    ]);
  });
  it('uses .compare when comparable', async () => {
    const compareByName = compareBy((person: Person) => person.name, String);

    expectOrder(compareByName).toSortValues([
      { age: 25, name: 'Alice' },
      { age: 26, name: 'Alice' },
      { age: 30, name: 'Bob' },
      { age: 31, name: 'Bob' },
    ]);
  });
});
