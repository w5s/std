import type { Task } from '@w5s/task/Task';

import { all as taskAll } from '@w5s/task/Task/all';
import { andThen as taskThen } from '@w5s/task/Task/andThen';
import { from as taskFrom } from '@w5s/task/Task/from';
import { ignore as taskIgnore } from '@w5s/task/Task/ignore';

import type { LogRecord } from '../LogRecord.js';

import { configuration } from '../configuration.js';

export function handle(logRecord: LogRecord): Task<void, never> {
  const tasks = getHandleTasks(logRecord);
  const allTasks = taskThen(tasks, (_) => taskAll(_));
  return taskIgnore(allTasks);
}

function getHandleTasks(logRecord: LogRecord): Task<Array<Task<void, never>>, never> {
  return taskFrom(({ resolve }) => {
    const handlerMap = configuration.get('handler');
    resolve(Object.values(handlerMap).map((handler) => handler(logRecord)));
  });
}
