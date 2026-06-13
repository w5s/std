import { all as taskAll } from '@w5s/task/Task/all';
import { from as taskFrom } from '@w5s/task/Task/from';
import { andThen as taskThen } from '@w5s/task/Task/andThen';
import { ignore as taskIgnore } from '@w5s/task/Task/ignore';
import type { Task } from '@w5s/task/Task';
import type { LogRecord } from '../LogRecord.js';
import { configuration } from '../configuration.js';

function getHandleTasks(logRecord: LogRecord): Task<Array<Task<void, never>>, never> {
  return taskFrom(({ resolve }) => {
    const handlerMap = configuration.get('handler');
    resolve(Object.values(handlerMap).map((handler) => handler(logRecord)));
  });
}

export function handle(logRecord: LogRecord): Task<void, never> {
  const tasks = getHandleTasks(logRecord);
  const allTasks = taskThen(tasks, (_) => taskAll(_));
  return taskIgnore(allTasks);
}
