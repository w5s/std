import { Result, unsafeRun } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { RandomGenerator } from './randomGenerator.js';

describe('RandomGenerator', () => {
  describe('.unsafe', () => {
    it('should use Math.random', async () => {
      const nextRandom = 0.123;
      vi.spyOn(Math, 'random').mockReturnValue(nextRandom);
      expect(unsafeRun(RandomGenerator.unsafe)).toEqual(Result.Ok(nextRandom));
    });
  });
  describe('.crypto', () => {
    it('should use crypto', async () => {
      expect(unsafeRun(RandomGenerator.crypto)).toEqual(Result.Ok(expect.any(Number)));
    });
  });
  describe('defaultRef', () => {
    it('should be unsafeGenerator', async () => {
      expect(RandomGenerator.defaultRef).toEqual({ current: RandomGenerator.crypto });
    });
  });
});
