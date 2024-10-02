import { expect, test, vi, type MockedFunction } from 'vitest';
import { Ref } from '@w5s/core';
import type { TaskLike, TaskRunner } from '../Task.js';

export const allSyncCombination = [
  ['sync', 'sync'],
  ['async', 'sync'],
  ['sync', 'async'],
  ['async', 'async'],
] as Array<['sync' | 'async', 'sync' | 'async']>;

export function runReportTask<Value, Error>(
  task: TaskLike<Value, Error>,
): {
  resolve: MockedFunction<(value: Value) => void>;
  reject: MockedFunction<(error: Error) => void>;
  initialCanceler: MockedFunction<() => void>;
  cancelerRef: Ref<MockedFunction<() => void>>;
  finished: Promise<void>;
  run: TaskRunner;
} {
  const resolveTask = vi.fn((_value: Value): void => {});
  const rejectTask = vi.fn((_error: Error): void => {});
  const initialCanceler = vi.fn(() => {});
  const cancelerRef = Ref(initialCanceler);
  const run = vi.fn();

  return {
    resolve: resolveTask,
    reject: rejectTask,
    initialCanceler,
    cancelerRef,
    run,
    finished: new Promise((resolve, _reject) => {
      task.taskRun({
        resolve: (value) => {
          resolveTask(value);
          resolve();
        },
        reject: (value) => {
          rejectTask(value);
          resolve();
        },
        canceler: cancelerRef,
        run,
      });
    }),
  };
}

test(runReportTask, () => expect(typeof runReportTask).toBe('function'));
