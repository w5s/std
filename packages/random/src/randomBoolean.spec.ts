import { describe, expect, it, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { Task } from '@w5s/task';
import { randomBoolean } from './randomBoolean.js';
import { randomGenerator } from './randomGenerator.js';

describe('randomBoolean', () => {
  const generatorOf = (value: number) => Task.resolve(value);
  const expectTask = withTask(expect);

  it('should use defaultGenerator', async () => {
    const nextRandom = 0.123;

    vi.spyOn(randomGenerator, 'taskRun').mockImplementation(({ resolve }) => resolve(nextRandom));
    const task = randomBoolean();
    await expectTask(task).toResolve(false);
  });
  it.each([
    [{ genValue: 0, trueWeight: 0.5 }, false],
    [{ genValue: 0.5, trueWeight: 0.5 }, false],
    [{ genValue: 0.5 + Number.EPSILON, trueWeight: 0.5 }, true],
    [{ genValue: 1, trueWeight: 0.5 }, true],
    [{ genValue: 0.5 + Number.EPSILON, trueWeight: 0.5 + Number.EPSILON }, false],
  ])('should return correct bounded values %s', async ({ genValue, trueWeight }, expected) => {
    const gen = generatorOf(genValue);
    const genBool = randomBoolean(trueWeight, gen);
    await expectTask(genBool).toResolve(expected);
  });
});
