import { describe, it, expect } from 'vitest';
import { generate } from './generate.js';
import { withAsyncIterable } from '../Testing.js';

describe(generate, () => {
  const expectAsyncIterable = withAsyncIterable(expect);

  it('should return an empty iterable when 0', async () => {
    await expectAsyncIterable(generate(0, () => 'a')).toHaveValues([]);
  });
  it('should use mapFn(index) to generate values', async () => {
    await expectAsyncIterable(generate(3, (_) => _)).toHaveValues([0, 1, 2]);
    await expectAsyncIterable(generate(3, async (_) => _)).toHaveValues([0, 1, 2]);
  });
  it('should be idempotent', async () => {
    await expectAsyncIterable(generate(3, (_) => _)).toBeIdemPotent();
    await expectAsyncIterable(generate(3, async (_) => _)).toBeIdemPotent();
  });
});
