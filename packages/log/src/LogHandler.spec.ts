import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/task';
import { UUID } from '@w5s/random';
import { LogHandler } from './LogHandler.js';
import { LogLevel } from './LogLevel.js';
import { LogRecord } from './LogRecord.js';
import { generateTime } from './__stub__.js';

describe('LogHandler', () => {
  describe('.filter', () => {
    it('should filter input', async () => {
      const handler = vi.fn(() => Task.resolve());
      const filtered = LogHandler.filter(handler, (record) => record.category === 'foo');
      const defaultProps = LogRecord({
        id: UUID.empty(),
        category: 'not_foo',
        level: LogLevel.Warning,
        created: generateTime(),
        message: [],
        data: {},
      });
      await Task.unsafeRunOk(
        filtered(
          LogRecord({
            ...defaultProps,
            category: 'not_foo',
          })
        )
      );
      expect(handler).not.toHaveBeenCalled();
      await Task.unsafeRunOk(
        filtered(
          LogRecord({
            ...defaultProps,
            category: 'foo',
          })
        )
      );
      expect(handler).not.toHaveBeenLastCalledWith({
        id: '',
        category: 'foo',
      });
    });
  });
});
