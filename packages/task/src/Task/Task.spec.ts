import { describe, expect, it } from 'vitest';
import { Result } from '@w5s/core';
import { Task } from './Task.js';

describe('Task', () => {
  describe('#run', () => {
    it('runs the task', async () => {
      const task = new Task(({ resolve }) => resolve('anyValue'));
      expect(task.run()).toEqual(Result.Ok('anyValue'));
    });
  });
});
