import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/task';
import { UUID } from '@w5s/core';
import { LogHandler } from './LogHandler.js';
import { LogLevel } from './LogLevel.js';
import { LogRecord } from './LogRecord.js';
import { generateLogRecord, generateTime } from './__stub__.js';

describe('LogHandler', () => {
  describe(LogHandler.filter, () => {
    it('should filter input', async () => {
      const handler = vi.fn(() => Task.resolve());
      const filtered = LogHandler.filter(handler, (record) => record.category === 'foo');
      const defaultProps = {
        _: 'LogRecord',
        id: UUID.empty(),
        category: 'not_foo',
        level: LogLevel.Warning,
        created: generateTime(),
        message: [],
        // data: {},
      } satisfies LogRecord;
      await Task.unsafeRunOk(
        filtered(
          generateLogRecord({
            ...defaultProps,
            category: 'not_foo',
          }),
        ),
      );
      expect(handler).not.toHaveBeenCalled();
      await Task.unsafeRunOk(
        filtered(
          generateLogRecord({
            ...defaultProps,
            category: 'foo',
          }),
        ),
      );
      expect(handler).not.toHaveBeenLastCalledWith({
        id: '',
        category: 'foo',
      });
    });
  });
});
