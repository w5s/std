import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/task';
import { withTask } from '@w5s/task/dist/Testing.js';
import { handle } from './handle.js';
import { LogApplication } from './LogApplication.js';
import { fakeLogRecord } from '../Testing.js';

describe(handle, () => {
  const expectTask = withTask(expect);

  const mockHandler1 = vi.fn(() => Task.resolve());
  const mockHandler2 = vi.fn(() => Task.resolve());
  LogApplication.configure({
    handler: {
      mock1: mockHandler1,
      mock2: mockHandler2,
    },
  });

  it('call all handlers', async () => {
    const anyRecord = fakeLogRecord();
    expectTask(handle(anyRecord)).toResolveSync(undefined);
    expect(mockHandler1).toHaveBeenLastCalledWith(anyRecord);
    expect(mockHandler2).toHaveBeenLastCalledWith(anyRecord);
  });
  it('run task', async () => {
    const anyRecord = fakeLogRecord();
    const task = Task.resolve();
    const taskSpy = vi.spyOn(task, 'taskRun');
    mockHandler1.mockImplementationOnce(() => task);
    expectTask(handle(anyRecord)).toResolveSync(undefined);
    expect(taskSpy).toHaveBeenCalledTimes(1);
  });
});
