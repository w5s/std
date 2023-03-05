import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/core';
import { UUID } from '@w5s/uuid';
import { LogHandler } from './handler.js';
import { LogLevel } from './level.js';
import { LogRecord } from './record.js';
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
