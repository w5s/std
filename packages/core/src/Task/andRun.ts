import type { Task, TaskLike } from '../Task.js';
import { andThen } from './andThen.js';
import { map } from './map.js';

/**
 * Similar to {@link andThen} but the task keep `task` resolved value
 *
 * @example
 * ```typescript
 * const success = Task.resolve('foo');
 * Task.andRun(success, (value) => Console.log('result=', value));// console.log('result=foo'); then resolves 'foo'
 * Task.andRun(success, (value) => Task.reject(`SomeError`));// Task.reject('SomeError')
 *
 * const failure = Task.reject('PreviousError');
 * Task.andRun(failure, (value) => Task.resolve(`never_used`));// Task.reject('PreviousError')
 * ```
 * @param task - a Task object
 * @param fn - the value mapper function
 */
export function andRun<Value, ErrorFrom, ErrorTo>(
  task: TaskLike<Value, ErrorFrom>,
  fn: (value: Value) => TaskLike<any, ErrorTo>
): Task<Value, ErrorFrom | ErrorTo> {
  return andThen(task, (value) => map(fn(value), () => value));
}
