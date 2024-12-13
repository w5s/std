import { describe, expect, it, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { randomGenerator } from './randomGenerator.js';
import { randomNumber } from './randomNumber.js';
import { fakeRandomGenerator } from './Testing.js';

describe('randomNumber', () => {
  const expectTask = withTask(expect);

  it('should use defaultGenerator', async () => {
    const nextRandom = 0.123;
    vi.spyOn(randomGenerator, 'taskRun').mockImplementation(({ resolve }) => resolve(nextRandom));
    const task = randomNumber(-2, 2);
    expectTask(task).toResolveSync(-1.508);
  });
  it.each([
    [{ genValue: 0, min: -2, max: 2 }, -2],
    [{ genValue: 0.5, min: -2, max: 2 }, 0],
    [{ genValue: 1, min: -2, max: 2 }, 2],
  ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
    const gen = fakeRandomGenerator(() => genValue);
    const genNum = randomNumber(min, max, gen);
    expectTask(genNum).toResolveSync(expected);
  });
});
