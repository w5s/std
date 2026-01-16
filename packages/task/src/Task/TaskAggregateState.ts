import type { TaskLike, TaskParameters } from '../Task.js';
import { TaskCanceler } from '../TaskCanceler.js';
import { unsafeCall } from './unsafeCall.js';

const cancel = (canceler: TaskCanceler) => {
  const { current } = canceler;
  if (current != null) {
    canceler.current = undefined;
    current();
  }
};

interface TaskInputEntry<Key, Value, Error> {
  /**
   * The task to run
   */
  task: TaskLike<Value, Error>;
  /**
   * The key of the task (number or string)
   */
  key: Key;
}

interface TaskEntry<Key, Value, Error> extends TaskInputEntry<Key, Value, Error> {
  /**
   * The canceler of the task
   */
  canceler: TaskCanceler;
}

interface TaskAggregateStateConfiguration {
  /**
   * Cancel children when parent is cancelled
   */
  cancelChildrenFromParent?: boolean;
}

interface TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError> {
  /**
   * Check if the aggregate state is complete
   */
  isComplete: () => boolean;
  /**
   * Complete the aggregate state
   */
  complete: () => void;
  /**
   * Cancel all the tasks
   */
  cancelAll: () => void;
  /**
   * Cancel the tasks if the predicate is true
   *
   * @param predicate - the predicate to check if the tasks should be cancelled
   */
  cancelIf: (predicate: (entry: TaskEntry<Key, Value, Error>) => boolean) => void;
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
  /**
   * Resolve the aggregate state
   */
  resolve: (value: ReturnValue) => void;
  /**
   * Reject the aggregate state
   */
  reject: (error: ReturnError) => void;
}

export function TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError>(
  tasks: Array<TaskInputEntry<Key, Value, Error>>,
  taskParameters: TaskParameters<ReturnValue, ReturnError>,
  options: TaskAggregateStateConfiguration = {},
): TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError> {
  const { reject, resolve, canceler: parentCanceler } = taskParameters;
  const taskEntries = tasks.map((task) => ({ ...task, canceler: TaskCanceler() }));
  const taskCount = taskEntries.length;
  let taskCompleted = 0;
  let closed = false;

  const isComplete = () => taskCompleted === taskCount;

  const complete = () => {
    taskCompleted = taskCount;
  };

  const cancelAll = () => {
    taskEntries.forEach(({ canceler }) => cancel(canceler));
  };
  const cancelIf = (predicate: (entry: TaskEntry<Key, Value, Error>) => boolean) => {
    taskEntries.forEach((entry) => {
      if (predicate(entry)) {
        cancel(entry.canceler);
      }
    });
  };

  const setCancelChildrenFromParent = (cancelChildrenFromParent: boolean) => {
    if (cancelChildrenFromParent) {
      const parentCurrent = parentCanceler.current;
      parentCanceler.current = () => {
        cancelAll();
        parentCurrent?.();
      };
    }
  };

  const withClose =
    <Fn extends (value: any) => any>(fn: Fn) =>
    (value: any) => {
      if (!closed) {
        closed = true;
        fn(value);
      }
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
    taskEntries.forEach((entry) => {
      unsafeCall(entry.task, {
        resolve: (value: Value) => {
          taskCompleted += 1;
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          resolveTask(value, entry, self);
        },
        reject: (error: Error) => {
          taskCompleted += 1;
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          rejectTask(error, entry, self);
        },
        canceler: entry.canceler,
      });
    });
  };

  setCancelChildrenFromParent(options.cancelChildrenFromParent ?? false);

  const self = {
    isComplete,
    complete,
    cancelAll,
    cancelIf,
    runAll,
    resolve: withClose(resolve),
    reject: withClose(reject),
  };
  return self;
}
