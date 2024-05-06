import type { Task, TaskLike } from '../Task.js';

export function wrap<Value, Error>(taskRun: TaskLike<Value, Error>['taskRun']): Task<Value, Error> {
  return {
    taskRun,
  };
}
