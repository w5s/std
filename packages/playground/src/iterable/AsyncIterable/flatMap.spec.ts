import { describe, it, expect } from 'vitest';
import { flatMap } from './flatMap.js';
import { withAsyncIterable } from '../Testing.js';
import { of } from './of.js';

describe(flatMap, () => {
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should return a flat mapped iterator', async () => {
    const source = of(1, 3, 2);
    await expectAsyncIterable(
      flatMap(source, (value, index) => of(`a_${value}_${index}`, `b_${value}_${index}`)),
    ).toHaveValues(['a_1_0', 'b_1_0', 'a_3_1', 'b_3_1', 'a_2_2', 'b_2_2']);
  });
  it('should be idempotent', async () => {
    const source = of(1, 3, 2);
    await expectAsyncIterable(flatMap(source, (value) => of(value, value * 2))).toBeIdemPotent();
  });
});
