import { describe, expect, it, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { Symbol } from '@w5s/core';
import { randomBoolean } from './randomBoolean.js';
import { next } from './Random/next.js';
import { fakeRandomGenerator } from './Testing.js';

describe('randomBoolean', () => {
  const expectTask = withTask(expect);

  it('should use defaultGenerator', async () => {
    const nextRandom = 0.123;

    vi.spyOn(next, Symbol.run).mockImplementation(({ resolve }) => resolve(nextRandom));
    const task = randomBoolean();
    expectTask(task).toResolveSync(false);
  });
  it.each([
    [{ genValue: 0, trueWeight: 0.5 }, false],
    [{ genValue: 0.5, trueWeight: 0.5 }, false],
    [{ genValue: 0.5 + Number.EPSILON, trueWeight: 0.5 }, true],
    [{ genValue: 1, trueWeight: 0.5 }, true],
    [{ genValue: 0.5 + Number.EPSILON, trueWeight: 0.5 + Number.EPSILON }, false],
  ])('should return correct bounded values %s', async ({ genValue, trueWeight }, expected) => {
    const gen = fakeRandomGenerator(() => genValue);
    const genBool = randomBoolean(trueWeight, gen);
    expectTask(genBool).toResolveSync(expected);
  });
});
