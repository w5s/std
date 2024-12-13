import { describe, it, expect } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { randomGenerator } from './randomGenerator.js';
import { RandomApplication } from './Random/RandomApplication.js';

describe('randomGenerator', () => {
  const expectTask = withTask(expect);
  it('should use configuration implementation', async () => {
    const nextRandom = 0.123;
    RandomApplication.configure({
      randomNumberGenerator: () => nextRandom,
    });
    expectTask(randomGenerator).toResolveSync(nextRandom);
  });
});
