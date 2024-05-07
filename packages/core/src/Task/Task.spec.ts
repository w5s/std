import { describe, expect, it } from 'vitest';
import { Task } from './Task.js';
import { Result } from '../Result.js';

describe('Task', () => {
  describe('#run', () => {
    it('runs the task', async () => {
      const task = new Task(({ resolve }) => resolve('anyValue'));
      expect(task.run()).toEqual(Result.Ok('anyValue'));
    });
  });
});
