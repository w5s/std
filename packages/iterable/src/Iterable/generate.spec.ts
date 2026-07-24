import { describe, expect, it } from 'vitest';

import { withIterable } from '../Testing.js';
import { generate } from './generate.js';

describe(generate, () => {
  const expectIterable = withIterable(expect);

  it('should return an empty iterable when 0', () => {
    expectIterable(generate(0, () => 'a')).toHaveValues([]);
  });
  it('should use mapFn(index) to generate values', () => {
    expectIterable(generate(3, (_) => _)).toHaveValues([0, 1, 2]);
  });
  it('should be idempotent', () => {
    expectIterable(generate(3, (_) => _)).toBeIdemPotent();
  });
});
