import { Result, unsafeRun } from '@w5s/core';
import { describe, expect, it, vi } from 'vitest';
import { RandomGenerator } from './randomGenerator.js';
import { randomNumber } from './randomNumber.js';
import { RandomValue } from './randomValue.js';

describe('randomNumber', () => {
  const generatorOf = (value: number) => RandomGenerator(() => RandomValue(value));

  it('should use defaultGenerator', async () => {
    const nextRandom = 0.123;
    vi.spyOn(RandomGenerator.defaultRef.current, 'taskRun').mockImplementation((resolve) =>
      resolve(RandomValue(nextRandom))
    );

    expect(unsafeRun(randomNumber(-2, 2))).toEqual(Result.Ok(-1.508));
  });
  it.each([
    [{ genValue: 0, min: -2, max: 2 }, -2],
    [{ genValue: 0.5, min: -2, max: 2 }, 0],
    [{ genValue: 1, min: -2, max: 2 }, 2],
  ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
    const gen = generatorOf(genValue);
    const genNum = randomNumber(min, max, gen);
    expect(Result.value(await unsafeRun(genNum))).toBe(expected);
  });
});
