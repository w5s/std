import { Result, unsafeRun } from '@w5s/core';
import { describe, expect, it, vi } from 'vitest';
import { RandomGenerator, defaultRandomGenerator } from './randomGenerator.js';
import { randomNumber } from './randomNumber.js';
import { RandomValue } from './randomValue.js';

describe('randomNumber', () => {
  const generatorOf = (value: number) => RandomGenerator(() => RandomValue.of(value));

  it('should use defaultGenerator', async () => {
    const nextRandom = 0.123;
    vi.spyOn(defaultRandomGenerator.current, 'taskRun').mockImplementation(({ resolve }) =>
      resolve(RandomValue.of(nextRandom))
    );
    const task = randomNumber(-2, 2);
    expect(unsafeRun(task)).toEqual(Result.Ok(-1.508));
  });
  it.each([
    [{ genValue: 0, min: -2, max: 2 }, -2],
    [{ genValue: 0.5, min: -2, max: 2 }, 0],
    [{ genValue: 1, min: -2, max: 2 }, 2],
  ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
    const gen = generatorOf(genValue);
    const genNum = randomNumber(min, max, gen);
    expect(Result.get(await unsafeRun(genNum))).toBe(expected);
  });
});
