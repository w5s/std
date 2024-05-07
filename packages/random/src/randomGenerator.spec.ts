import { Result, Task } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { RandomGenerator, defaultRandomGenerator } from './randomGenerator.js';

describe('RandomGenerator', () => {
  describe('.unsafe', () => {
    it('should use Math.random', async () => {
      const nextRandom = 0.123;
      vi.spyOn(Math, 'random').mockReturnValue(nextRandom);
      expect(Task.unsafeRun(RandomGenerator.unsafe)).toEqual(Result.Ok(nextRandom));
    });
  });
  describe('.crypto', () => {
    it('should use crypto', async () => {
      expect(Task.unsafeRun(RandomGenerator.crypto)).toEqual(Result.Ok(expect.any(Number)));
    });
  });
});
describe('defaultRandomGenerator', () => {
  it('should be unsafeGenerator', async () => {
    expect(defaultRandomGenerator).toEqual({ current: RandomGenerator.crypto });
  });
});
