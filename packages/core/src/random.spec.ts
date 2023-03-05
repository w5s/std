import { describe, it, expect, jest } from '@jest/globals';
import { Int } from './integer.js';
import { Random } from './random.js';
import { Result } from './result.js';
import { Task } from './task.js';

describe('Random', () => {
  const generatorOf = (value: number) => Random.Generator(() => Random.Value(value));
  const mockDefaultGenerator = (value: number) =>
    jest
      .spyOn(Random.defaultGeneratorRef.current, 'taskRun')
      .mockImplementation((resolve) => resolve(Random.Value(value)));

  describe('Value', () => {
    it('should return new random value', () => {
      expect(Random.Value(0)).toBe(0);
      expect(Random.Value(1)).toBe(1);
    });
    it.each([Number.NaN, -1, 2])('should throw invariant when invalid value : %s', (invalidValue) => {
      expect(() => Random.Value(invalidValue)).toThrow(`Random value should be between 0 and 1. Got ${invalidValue}`);
    });
  });
  describe('hasInstance', () => {
    it('should return new random value', () => {
      expect(Random.Value.hasInstance(0)).toBe(true);
      expect(Random.Value.hasInstance(1)).toBe(true);
    });
    it.each([Number.NaN, -1, 2])('should return false for invalid value : %s', (invalidValue) => {
      expect(Random.Value.hasInstance(invalidValue)).toBe(false);
    });
  });
  describe('unsafeGenerator', () => {
    it('should use Math.random', async () => {
      const nextRandom = 0.123;
      jest.spyOn(Math, 'random').mockReturnValue(nextRandom);
      expect(Task.unsafeRun(Random.unsafeGenerator)).toEqual(Result.Ok(nextRandom));
    });
  });
  describe('cryptoGenerator', () => {
    it('should use crypto', async () => {
      expect(Task.unsafeRun(Random.cryptoGenerator)).toEqual(Result.Ok(expect.any(Number)));
    });
  });
  describe('defaultGenerator', () => {
    it('should be unsafeGenerator', async () => {
      expect(Random.defaultGeneratorRef).toEqual({ current: Random.cryptoGenerator });
    });
  });
  describe('.number', () => {
    it.each([
      [{ genValue: 0, min: -2, max: 2 }, -2],
      [{ genValue: 0.5, min: -2, max: 2 }, 0],
      [{ genValue: 1, min: -2, max: 2 }, 2],
    ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
      const gen = generatorOf(genValue);
      const genNum = Random.number(min, max, gen);
      expect(Result.value(await Task.unsafeRun(genNum))).toBe(expected);
    });
    it('should use defaultGenerator', async () => {
      const nextRandom = 0.123;
      mockDefaultGenerator(nextRandom);
      expect(Task.unsafeRun(Random.number(-2, 2))).toEqual(Result.Ok(-1.508));
    });
  });
  describe('.int', () => {
    it('should use defaultGenerator', async () => {
      const nextRandom = 0.123;
      mockDefaultGenerator(nextRandom);
      expect(Task.unsafeRun(Random.int(Int(-10), Int(10)))).toEqual(Result.Ok(-8));
    });
    it.each([
      [{ genValue: 0, min: Int(-2), max: Int(2) }, -2],
      [{ genValue: 0.5, min: Int(-2), max: Int(2) }, 0],
      [{ genValue: 0.8, min: Int(-2), max: Int(2) }, 1],
      [{ genValue: 1, min: Int(-2), max: Int(2) }, 2],
    ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
      const gen = generatorOf(genValue);
      const genNum = Random.int(min, max, gen);
      expect(Result.value(await Task.unsafeRun(genNum))).toBe(expected);
    });
  });
  describe('.boolean', () => {
    it('should use defaultGenerator', async () => {
      const nextRandom = 0.123;
      mockDefaultGenerator(nextRandom);
      expect(Task.unsafeRun(Random.boolean())).toEqual(Result.Ok(false));
    });
    it.each([
      [{ genValue: 0, trueWeight: 0.5 }, false],
      [{ genValue: 0.5, trueWeight: 0.5 }, false],
      [{ genValue: 0.5 + Number.EPSILON, trueWeight: 0.5 }, true],
      [{ genValue: 1, trueWeight: 0.5 }, true],
      [{ genValue: 0.5 + Number.EPSILON, trueWeight: 0.5 + Number.EPSILON }, false],
    ])('should return correct bounded values %s', async ({ genValue, trueWeight }, expected) => {
      const gen = generatorOf(genValue);
      const genBool = Random.boolean(trueWeight, gen);
      expect(Task.unsafeRun(genBool)).toEqual(Result.Ok(expected));
    });
  });
});
