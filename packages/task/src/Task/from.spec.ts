import { describe, expect, it } from 'vitest';
import { Result } from '@w5s/core/dist/Result.js';
import { from } from './from.js';
import { run } from './run.js';

describe(from, () => {
  it('returns same value when Task', () => {
    const task = from(({ resolve }) => resolve('anyValue'));
    expect(from(task)).toBe(task);
  });
  it('returns a Task from callback', () => {
    const task = from(({ resolve }) => resolve('anyValue'));
    expect(run(task)).toEqual(Result.Ok('anyValue'));
  });
  it('returns a Task from TaskLike', () => {
    const task = from({ taskRun: ({ resolve }) => resolve('anyValue') });
    expect(run(task)).toEqual(Result.Ok('anyValue'));
  });
});
