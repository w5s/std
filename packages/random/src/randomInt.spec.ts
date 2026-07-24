import { Int, Symbol } from '@w5s/core';
import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it, vi } from 'vitest';

import { next } from './Random/next.js';
import { randomInt } from './randomInt.js';
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
    [{ genValue: 0, max: Int(2), min: Int(-2) }, -2],
    [{ genValue: 0.5, max: Int(2), min: Int(-2) }, 0],
    [{ genValue: 0.8, max: Int(2), min: Int(-2) }, 1],
    [{ genValue: 1, max: Int(2), min: Int(-2) }, 2],
  ])('should return correct bounded values %s', async ({ genValue, max, min }, expected) => {
    const gen = fakeRandomGenerator(() => genValue);
    const genNum = randomInt(min, max, gen);
    expectTask(genNum).toResolveSync(expected);
  });
});
