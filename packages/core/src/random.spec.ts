import { describe, test, expect, jest } from '@jest/globals';
import { Int } from './integer.js';
import { Random } from './random.js';
import { Result } from './result.js';
import { Task } from './task.js';

describe('Random', () => {
  const generatorOf = (value: number) => Random.Generator(() => Random.Value(value));
  const mockDefaultGenerator = (value: number) =>
    jest.spyOn(Random.defaultGenerator, 'taskRun').mockImplementation((resolve) => resolve(Random.Value(value)));

  describe(Random.Value, () => {
    test('should return new random value', () => {
      expect(Random.Value(0)).toBe(0);
      expect(Random.Value(1)).toBe(1);
    });
    test.each([Number.NaN, -1, 2])('should throw invariant when invalid value : %s', (invalidValue) => {
      expect(() => Random.Value(invalidValue)).toThrow(`Random value should be between 0 and 1. Got ${invalidValue}`);
    });
  });
  describe(Random.Value.hasInstance, () => {
    test('should return new random value', () => {
      expect(Random.Value.hasInstance(0)).toBe(true);
      expect(Random.Value.hasInstance(1)).toBe(true);
    });
    test.each([Number.NaN, -1, 2])('should return false for invalid value : %s', (invalidValue) => {
      expect(Random.Value.hasInstance(invalidValue)).toBe(false);
    });
  });
  describe(Random.Generator.number, () => {
    test.each([
      [{ genValue: 0, min: -2, max: 2 }, -2],
      [{ genValue: 0.5, min: -2, max: 2 }, 0],
      [{ genValue: 1, min: -2, max: 2 }, 2],
    ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
      const gen = generatorOf(genValue);
      const genNum = Random.Generator.number(gen)(min, max);
      expect(Result.value(await Task.unsafeRun(genNum))).toBe(expected);
    });
  });
  describe(Random.Generator.int, () => {
    test.each([
      [{ genValue: 0, min: Int(-2), max: Int(2) }, -2],
      [{ genValue: 0.5, min: Int(-2), max: Int(2) }, 0],
      [{ genValue: 0.8, min: Int(-2), max: Int(2) }, 1],
      [{ genValue: 1, min: Int(-2), max: Int(2) }, 2],
    ])('should return correct bounded values %s', async ({ genValue, min, max }, expected) => {
      const gen = generatorOf(genValue);
      const genNum = Random.Generator.int(gen)(min, max);
      expect(Result.value(await Task.unsafeRun(genNum))).toBe(expected);
    });
  });
  describe(Random.Generator.boolean, () => {
    test.each([
      [{ genValue: 0, trueWeight: 0.5 }, false],
      [{ genValue: 0.5, trueWeight: 0.5 }, false],
      [{ genValue: 0.5 + Number.EPSILON, trueWeight: 0.5 }, true],
      [{ genValue: 1, trueWeight: 0.5 }, true],
      [{ genValue: 0.5 + Number.EPSILON, trueWeight: 0.5 + Number.EPSILON }, false],
    ])('should return correct bounded values %s', async ({ genValue, trueWeight }, expected) => {
      const gen = generatorOf(genValue);
      const genBool = Random.Generator.boolean(gen)(trueWeight);
      expect(Task.unsafeRun(genBool)).toEqual(Result.Ok(expected));
    });
  });
  describe('defaultGenerator', () => {
    test('should use Math.random', async () => {
      const nextRandom = 0.123;
      jest.spyOn(Math, 'random').mockReturnValue(nextRandom);
      expect(Task.unsafeRun(Random.defaultGenerator)).toEqual(Result.Ok(nextRandom));
    });
  });
  describe('.number', () => {
    test('should use defaultGenerator', async () => {
      const nextRandom = 0.123;
      mockDefaultGenerator(nextRandom);
      expect(Task.unsafeRun(Random.number(-2, 2))).toEqual(Result.Ok(-1.508));
    });
  });
  describe('.int', () => {
    test('should use defaultGenerator', async () => {
      const nextRandom = 0.123;
      mockDefaultGenerator(nextRandom);
      expect(Task.unsafeRun(Random.int(Int(-10), Int(10)))).toEqual(Result.Ok(-8));
    });
  });
  describe('.boolean', () => {
    test('should use defaultGenerator', async () => {
      const nextRandom = 0.123;
      mockDefaultGenerator(nextRandom);
      expect(Task.unsafeRun(Random.boolean())).toEqual(Result.Ok(false));
    });
  });
});
