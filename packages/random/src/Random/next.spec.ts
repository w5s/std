import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it } from 'vitest';

import { configuration } from '../configuration.js';
import { next } from './next.js';

describe('next', () => {
  const expectTask = withTask(expect);
  it('should use configuration implementation', async () => {
    const nextRandom = 0.123;
    configuration.update({
      randomNumberGenerator: () => nextRandom,
    });
    expectTask(next).toResolveSync(nextRandom);
  });
});
