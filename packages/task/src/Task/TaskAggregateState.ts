import type { TaskCanceler, TaskLike, TaskParameters } from '../Task.js';

const cancel = (cancelerRef: TaskCanceler) => {
  const { current } = cancelerRef;
  if (current != null) {
    cancelerRef.current = undefined;
    current();
  }
};

type TaskEntry<Value, Error> = Readonly<{
  task: TaskLike<Value, Error>;
  canceler: TaskCanceler;
}>;

export class TaskAggregateState<Value, Error, ReturnValue, ReturnError> {
  readonly tasks: ReadonlyArray<TaskEntry<Value, Error>>;

  readonly taskCount: number;

  readonly taskParameters: TaskParameters<ReturnValue, ReturnError>;

  #taskCompleted = 0;

  #closed = false;

  constructor(tasks: Array<TaskLike<Value, Error>>, taskParameters: TaskParameters<ReturnValue, ReturnError>) {
    this.tasks = tasks.map((task) => ({
      task,
      canceler: { current: undefined },
    }));
    this.taskCount = this.tasks.length;
    this.taskParameters = taskParameters;
  }

  isComplete() {
    return this.#taskCompleted === this.taskCount;
  }

  complete() {
    this.#taskCompleted = this.taskCount;
  }

  cancelAll() {
    this.tasks.forEach(({ canceler }) => cancel(canceler));
  }

  runAll(
    resolveTask: (value: Value, entry: TaskEntry<Value, Error>, index: number) => void,
    rejectTask: (error: Error, entry: TaskEntry<Value, Error>, index: number) => void,
  ) {
    const { run } = this.taskParameters;
    this.tasks.forEach((entry, taskIndex) => {
      entry.task.taskRun({
        resolve: (value: Value) => {
          if (!this.isComplete()) {
            this.#taskCompleted += 1;
            resolveTask(value, entry, taskIndex);
          }
        },
        reject: (error: Error) => {
          if (!this.isComplete()) {
            this.#taskCompleted += 1;
            rejectTask(error, entry, taskIndex);
          }
        },
        canceler: entry.canceler,
        run,
      });
    });
  }

  resolve(value: ReturnValue) {
    if (!this.#closed) {
      this.#closed = true;
      this.taskParameters.resolve(value);
    }
  }

  reject(error: ReturnError) {
    if (!this.#closed) {
      this.#closed = true;
      this.taskParameters.reject(error);
    }
  }
}
