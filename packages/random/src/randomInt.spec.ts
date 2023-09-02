import { Int, Result, unsafeRun } from '@w5s/core';
import { describe, expect, it, vi } from 'vitest';
import { RandomGenerator, defaultRandomGenerator } from './randomGenerator.js';
import { randomInt } from './randomInt.js';
import { RandomValue } from './randomValue.js';

describe('randomInt', () => {
  const generatorOf = (value: number) => RandomGenerator(() => RandomValue.of(value));

  it('should use defaultGenerator', async () => {
    const nextRandom = 0.123;
    vi.spyOn(defaultRandomGenerator.current, 'taskRun').mockImplementation(({ resolve }) =>
      resolve(RandomValue.of(nextRandom))
    );
    expect(unsafeRun(randomInt(Int.of(-10), Int.of(10)))).toEqual(Result.Ok(-8));
  });
  it.each([
    [{ genValue: 0, min: Int.of(-2), max: Int.of(2) }, -2],
    [{ genValue: 0.5, min: Int.of(-2), max: Int.of(2) }, 0],
    [{ genValue: 0.8, min: Int.of(-2), max: Int.of(2) }, 1],
    [{ genValue: 1, min: Int.of(-2), max: Int.of(2) }, 2],
  ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
    const gen = generatorOf(genValue);
    const genNum = randomInt(min, max, gen);
    expect(Result.value(await unsafeRun(genNum))).toBe(expected);
  });
});
