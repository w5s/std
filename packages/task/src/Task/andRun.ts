import type { TaskLike } from '../Task.js';
import type { Task } from './Task.js';
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
 * @param self - a Task object
 * @param fn - the value mapper function
 */
export function andRun<ValueFrom, ErrorFrom, ErrorTo>(
  self: TaskLike<ValueFrom, ErrorFrom>,
  fn: (value: ValueFrom) => TaskLike<any, ErrorTo>,
): Task<ValueFrom, ErrorFrom | ErrorTo> {
  return andThen(self, (value) => map(fn(value), () => value));
}
