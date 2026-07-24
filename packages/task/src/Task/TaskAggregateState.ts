import type { TaskLike, TaskParameters } from '../Task.js';

import { TaskCanceler } from '../TaskCanceler.js';
import { unsafeCall } from './unsafeCall.js';

interface TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError> {
  /**
   * Cancel all the tasks
   */
  cancelAll: () => void;

  /**
   * Cancel the tasks if the predicate is true
   *
   * @param predicate the predicate to check if the tasks should be cancelled
   */
  cancelIf: (predicate: (entry: TaskEntry<Key, Value, Error>) => boolean) => void;

  /**
   * Check if the aggregate state is complete
   */
  isComplete: () => boolean;

  /**
   * Reject the aggregate state
   */
  reject: (error: ReturnError) => void;

  /**
   * Resolve the aggregate state
   */
  resolve: (value: ReturnValue) => void;

  /**
   * Run all the tasks
   */
  runAll: (
    resolveTask: (
      value: Value,
      entry: TaskEntry<Key, Value, Error>,
      self: TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError>,
    ) => void,
    rejectTask: (
      error: Error,
      entry: TaskEntry<Key, Value, Error>,
      self: TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError>,
    ) => void,
  ) => void;
}

interface TaskAggregateStateConfiguration {
  /**
   * Cancel children when parent is cancelled
   */
  cancelChildrenFromParent?: boolean;
}

interface TaskEntry<Key, Value, Error> extends TaskInputEntry<Key, Value, Error> {
  /**
   * The canceler of the task
   */
  canceler: TaskCanceler;
}

interface TaskInputEntry<Key, Value, Error> {
  /**
   * The key of the task (number or string)
   */
  key: Key;

  /**
   * The task to run
   */
  task: TaskLike<Value, Error>;
}

export function TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError>(
  tasks: Array<TaskInputEntry<Key, Value, Error>>,
  taskParameters: TaskParameters<ReturnValue, ReturnError>,
  options: TaskAggregateStateConfiguration = {},
): TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError> {
  const { canceler: parentCanceler, reject, resolve } = taskParameters;
  const taskEntries = tasks.map((task) => ({ ...task, canceler: new TaskCanceler() }));
  const taskCount = taskEntries.length;
  let taskCompleted = 0;
  let closed = false;

  const isComplete = () => taskCompleted === taskCount;

  const cancelAll = () => {
    for (const { canceler } of taskEntries) {
      canceler.cancel();
    }
  };
  const cancelIf = (predicate: (entry: TaskEntry<Key, Value, Error>) => boolean) => {
    for (const entry of taskEntries) {
      if (predicate(entry)) {
        entry.canceler.cancel();
      }
    }
  };

  const setCancelChildrenFromParent = (cancelChildrenFromParent: boolean) => {
    if (!cancelChildrenFromParent) return;
    const { onCancel } = parentCanceler;
    parentCanceler.onCancel = () => {
      cancelAll();
      onCancel?.();
    };
  };

  const withClose =
    <Fn extends (value: any) => any>(fn: Fn) =>
      (value: any) => {
        if (closed) return;
        closed = true;
        fn(value);
      };

  const runAll = (
    resolveTask: (
      value: Value,
      entry: TaskEntry<Key, Value, Error>,
      self: TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError>,
    ) => void,
    rejectTask: (
      error: Error,
      entry: TaskEntry<Key, Value, Error>,
      self: TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError>,
    ) => void,
  ) => {
    for (const entry of taskEntries) {
      unsafeCall(entry.task, {
        canceler: entry.canceler,
        // eslint-disable-next-line ts/no-loop-func
        reject: (error: Error) => {
          taskCompleted += 1;
          // eslint-disable-next-line ts/no-use-before-define
          rejectTask(error, entry, self);
        },
        // eslint-disable-next-line ts/no-loop-func
        resolve: (value: Value) => {
          taskCompleted += 1;
          // eslint-disable-next-line ts/no-use-before-define
          resolveTask(value, entry, self);
        },
      });
    }
  };

  setCancelChildrenFromParent(options.cancelChildrenFromParent ?? false);

  const self = {
    cancelAll,
    cancelIf,
    isComplete,
    reject: withClose(reject),
    resolve: withClose(resolve),
    runAll,
  };
  return self;
}
