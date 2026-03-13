import { describe, it, expect } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { next } from './next.js';
import { configuration } from '../configuration.js';

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
