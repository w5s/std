import type { TaskLike, TaskParameters } from '../Task.js';

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
  controller: AbortController;
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
    resolveTask: (value: Value, entry: TaskEntry<Key, Value, Error>) => void,
    rejectTask: (error: Error, entry: TaskEntry<Key, Value, Error>) => void,
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
  const { reject, resolve, execute } = taskParameters;
  const taskEntries = tasks.map((task) => ({ ...task, controller: new AbortController() }));
  const taskCount = taskEntries.length;
  let taskCompleted = 0;
  let closed = false;

  const isComplete = () => taskCompleted === taskCount;

  const complete = () => {
    taskCompleted = taskCount;
  };

  const cancelAll = () => {
    taskEntries.forEach(({ controller }) => controller.abort());
  };
  const cancelIf = (predicate: (entry: TaskEntry<Key, Value, Error>) => boolean) => {
    taskEntries.forEach((entry) => {
      if (predicate(entry)) {
        entry.controller.abort();
      }
    });
  };

  const setCancelChildrenFromParent = (cancelChildrenFromParent: boolean) => {
    if (cancelChildrenFromParent) {
      taskParameters.canceler.addEventListener('abort', cancelAll);
    } else {
      taskParameters.canceler.removeEventListener('abort', cancelAll);
    }
  };

  const withClose =
    <Fn extends (value: any) => any>(fn: Fn) =>
    (value: any) => {
      if (!closed) {
        closed = true;
        setCancelChildrenFromParent(false); // remove listener
        fn(value);
      }
    };

  const runAll = (
    resolveTask: (value: Value, entry: TaskEntry<Key, Value, Error>) => void,
    rejectTask: (error: Error, entry: TaskEntry<Key, Value, Error>) => void,
  ) => {
    taskEntries.forEach((entry) => {
      execute(entry.task, {
        resolve: (value: Value) => {
          taskCompleted += 1;
          resolveTask(value, entry);
        },
        reject: (error: Error) => {
          taskCompleted += 1;
          rejectTask(error, entry);
        },
        canceler: entry.controller.signal,
      });
    });
  };

  setCancelChildrenFromParent(options.cancelChildrenFromParent ?? false);

  return {
    isComplete,
    complete,
    cancelAll,
    cancelIf,
    runAll,
    resolve: withClose(resolve),
    reject: withClose(reject),
  };
}
