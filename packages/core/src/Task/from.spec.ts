import { describe, expect, it } from 'vitest';
import { from } from './from.js';
import { unsafeRun } from './unsafeRun.js';
import { Result } from '../Result.js';

describe(from, () => {
  it('returns a Task from callback', () => {
    const task = from(({ resolve }) => resolve('anyValue'));
    expect(unsafeRun(task)).toEqual(Result.Ok('anyValue'));
  });
  it('returns a Task from TaskLike', () => {
    const task = from({ taskRun: ({ resolve }) => resolve('anyValue') });
    expect(unsafeRun(task)).toEqual(Result.Ok('anyValue'));
  });
});
