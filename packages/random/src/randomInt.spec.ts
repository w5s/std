import { Int, Symbol } from '@w5s/core';
import { describe, expect, it, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { randomInt } from './randomInt.js';
import { next } from './Random/next.js';
import { fakeRandomGenerator } from './Testing.js';

describe('randomInt', () => {
  const expectTask = withTask(expect);

  it('should use defaultGenerator', async () => {
    const nextRandom = 0.123;
    vi.spyOn(next, Symbol.run).mockImplementation(({ resolve }) => resolve(nextRandom));
    const task = randomInt(Int(-10), Int(10));
    expectTask(task).toResolveSync(-8);
  });
  it.each([
    [{ genValue: 0, min: Int(-2), max: Int(2) }, -2],
    [{ genValue: 0.5, min: Int(-2), max: Int(2) }, 0],
    [{ genValue: 0.8, min: Int(-2), max: Int(2) }, 1],
    [{ genValue: 1, min: Int(-2), max: Int(2) }, 2],
  ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
    const gen = fakeRandomGenerator(() => genValue);
    const genNum = randomInt(min, max, gen);
    expectTask(genNum).toResolveSync(expected);
  });
});
