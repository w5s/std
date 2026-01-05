import type { TaskCanceler, TaskLike, TaskParameters } from '../Task.js';

const cancel = (cancelerRef: TaskCanceler) => {
  const { current } = cancelerRef;
  if (current != null) {
    cancelerRef.current = undefined;
    current();
  }
};

type TaskEntry<Key, Value, Error> = {
  /**
   * The task to run
   */
  task: TaskLike<Value, Error>;
  /**
   * The canceler of the task
   */
  canceler: TaskCanceler;
  /**
   * The key of the task (number or string)
   */
  key: Key;
};

interface TaskAggregateState<Key, Value, Error, ReturnValue, ReturnError> {
  isComplete: () => boolean;
  complete: () => void;
  cancelAll: () => void;
  runAll: (
    resolveTask: (value: Value, entry: TaskEntry<Key, Value, Error>) => void,
    rejectTask: (error: Error, entry: TaskEntry<Key, Value, Error>) => void,
  ) => void;
  resolve: (value: ReturnValue) => void;
  reject: (error: ReturnError) => void;
}

type EntryKey = number;

export function TaskAggregateState<Value, Error, ReturnValue, ReturnError>(
  tasks: Array<TaskLike<Value, Error>>,
  taskParameters: TaskParameters<ReturnValue, ReturnError>,
): TaskAggregateState<EntryKey, Value, Error, ReturnValue, ReturnError> {
  const { reject, resolve, execute } = taskParameters;
  const taskEntries = tasks.map((task, index) => ({ task, key: index, canceler: { current: undefined } }));
  const taskCount = taskEntries.length;
  let taskCompleted = 0;
  let closed = false;

  const withClose =
    <Fn extends (value: any) => any>(fn: Fn) =>
    (value: any) => {
      if (!closed) {
        closed = true;
        fn(value);
      }
    };

  const isComplete = () => taskCompleted === taskCount;

  const complete = () => {
    taskCompleted = taskCount;
  };

  const cancelAll = () => {
    taskEntries.forEach(({ canceler }) => cancel(canceler));
  };

  const runAll = (
    resolveTask: (value: Value, entry: TaskEntry<EntryKey, Value, Error>) => void,
    rejectTask: (error: Error, entry: TaskEntry<EntryKey, Value, Error>) => void,
  ) => {
    taskEntries.forEach((entry) => {
      execute(entry.task, {
        resolve: (value: Value) => {
          if (!isComplete()) {
            taskCompleted += 1;
            resolveTask(value, entry);
          }
        },
        reject: (error: Error) => {
          if (!isComplete()) {
            taskCompleted += 1;
            rejectTask(error, entry);
          }
        },
        canceler: entry.canceler,
      });
    });
  };

  return { isComplete, complete, cancelAll, runAll, resolve: withClose(resolve), reject: withClose(reject) };
}
