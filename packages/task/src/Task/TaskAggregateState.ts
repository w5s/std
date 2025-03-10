import type { TaskCanceler, TaskLike, TaskParameters } from '../Task.js';

const cancel = (cancelerRef: TaskCanceler) => {
  const { current } = cancelerRef;
  if (current != null) {
    cancelerRef.current = undefined;
    current();
  }
};

type TaskEntry<Value, Error> = {
  task: TaskLike<Value, Error>;
  canceler: TaskCanceler;
};

interface TaskAggregateState<Value, Error, ReturnValue, ReturnError> {
  isComplete: () => boolean;
  complete: () => void;
  cancelAll: () => void;
  runAll: (
    resolveTask: (value: Value, entry: TaskEntry<Value, Error>, index: number) => void,
    rejectTask: (error: Error, entry: TaskEntry<Value, Error>, index: number) => void,
  ) => void;
  resolve: (value: ReturnValue) => void;
  reject: (error: ReturnError) => void;
}

export function TaskAggregateState<Value, Error, ReturnValue, ReturnError>(
  tasks: Array<TaskLike<Value, Error>>,
  taskParameters: TaskParameters<ReturnValue, ReturnError>,
): TaskAggregateState<Value, Error, ReturnValue, ReturnError> {
  const { reject, resolve, execute } = taskParameters;
  const taskEntries = tasks.map((task) => ({ task, canceler: { current: undefined } }));
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
    resolveTask: (value: Value, entry: TaskEntry<Value, Error>, index: number) => void,
    rejectTask: (error: Error, entry: TaskEntry<Value, Error>, index: number) => void,
  ) => {
    taskEntries.forEach((entry, index) => {
      execute(entry.task, {
        resolve: (value: Value) => {
          if (!isComplete()) {
            taskCompleted += 1;
            resolveTask(value, entry, index);
          }
        },
        reject: (error: Error) => {
          if (!isComplete()) {
            taskCompleted += 1;
            rejectTask(error, entry, index);
          }
        },
        canceler: entry.canceler,
      });
    });
  };

  return { isComplete, complete, cancelAll, runAll, resolve: withClose(resolve), reject: withClose(reject) };
}
