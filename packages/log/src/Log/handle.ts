import { all as taskAll } from '@w5s/task/dist/Task/all.js';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import { andThen as taskThen } from '@w5s/task/dist/Task/andThen.js';
import { ignore as taskIgnore } from '@w5s/task/dist/Task/ignore.js';
import type { Task } from '@w5s/task';
import type { LogRecord } from '../LogRecord.js';
import { LogApplication } from './LogApplication.js';

function getHandleTasks(logRecord: LogRecord): Task<Array<Task<void, never>>, never> {
  return taskFrom(({ resolve }) => {
    const handlerMap = LogApplication.get('handler');
    resolve(Object.values(handlerMap).map((handler) => handler(logRecord)));
  });
}

export function handle(logRecord: LogRecord): Task<void, never> {
  const tasks = getHandleTasks(logRecord);
  const allTasks = taskThen(tasks, (_) => taskAll(_));
  return taskIgnore(allTasks);
}
