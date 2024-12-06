import { Int } from '@w5s/core';
import { describe, expect, it, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { RandomGenerator, defaultRandomGenerator } from './randomGenerator.js';
import { randomInt } from './randomInt.js';

describe('randomInt', () => {
  const generatorOf = (value: number) => RandomGenerator(() => value);
  const expectTask = withTask(expect);

  it('should use defaultGenerator', async () => {
    const nextRandom = 0.123;
    vi.spyOn(defaultRandomGenerator.current, 'taskRun').mockImplementation(({ resolve }) => resolve(nextRandom));
    const task = randomInt(Int(-10), Int(10));
    await expectTask(task).toResolve(-8);
  });
  it.each([
    [{ genValue: 0, min: Int(-2), max: Int(2) }, -2],
    [{ genValue: 0.5, min: Int(-2), max: Int(2) }, 0],
    [{ genValue: 0.8, min: Int(-2), max: Int(2) }, 1],
    [{ genValue: 1, min: Int(-2), max: Int(2) }, 2],
  ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
    const gen = generatorOf(genValue);
    const genNum = randomInt(min, max, gen);
    await expectTask(genNum).toResolve(expected);
  });
});
