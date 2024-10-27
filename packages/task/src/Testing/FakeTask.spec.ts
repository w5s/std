import { describe, expect, it } from 'vitest';
import { Result } from '@w5s/core';
import { FakeTask } from './FakeTask.js';
import { unsafeRun } from '../Task/unsafeRun.js';

describe(FakeTask, () => {
  it('should resolve value', () => {
    const task = FakeTask({ value: 'anyValue' });
    const result = unsafeRun(task);
    expect(result).toEqual(Result.Ok('anyValue'));
  });
  it('should reject value', () => {
    const task = FakeTask({ error: 'anyError' });
    const result = unsafeRun(task);
    expect(result).toEqual(Result.Error('anyError'));
  });
  it('should throw error', () => {
    const task = FakeTask({ throwError: 'MockError' });
    expect(() => unsafeRun(task)).toThrow('MockError');
  });
});
