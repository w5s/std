import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/task';
import { LogHandler } from './LogHandler.js';
import { generateLogRecord } from './__stub__.js';

describe('LogHandler', () => {
  describe(LogHandler.filter, () => {
    it('should filter input', async () => {
      const handler = vi.fn(() => Task.resolve());
      const filtered = LogHandler.filter(handler, (record) => record.category === 'foo');
      const defaultProps = generateLogRecord();
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
