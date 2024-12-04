import type { Task } from '@w5s/task';
import type { LogRecord } from './LogRecord.js';
import { Console } from './LogHandler/Console.js';
import { filter } from './LogHandler/filter.js';

export interface LogHandler {
  (logRecord: LogRecord): Task<void, never>;
}
/**
 * @namespace
 */
export const LogHandler = {
  filter,
  Console,
};
