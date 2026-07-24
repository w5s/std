import { Result } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import { run } from '../Task/run.js';
import { FakeTask } from './FakeTask.js';

describe(FakeTask, () => {
  it('should resolve value', () => {
    const task = FakeTask({ value: 'anyValue' });
    const result = run(task);
    expect(result).toEqual(Result.Ok('anyValue'));
  });
  it('should reject value', () => {
    const task = FakeTask({ error: 'anyError' });
    const result = run(task);
    expect(result).toEqual(Result.Error('anyError'));
  });
  it('should throw error', () => {
    const task = FakeTask({ throwError: 'MockError' });
    expect(() => run(task)).toThrow('MockError');
  });
});
