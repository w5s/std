import { describe, it, expect, jest } from '@jest/globals';
import { Task } from '@w5s/core';
import { UUID } from '@w5s/uuid';
import { LogHandler } from './handler.js';
import { LogLevel } from './level.js';
import { LogRecord } from './record.js';
import { generateTime } from './__stub__.js';

describe('LogHandler', () => {
  describe(LogHandler.filter, () => {
    it('should filter input', async () => {
      const handler = jest.fn(() => Task.resolve());
      const filtered = LogHandler.filter(handler, (record) => record.logCategory === 'foo');
      const defaultProps = LogRecord({
        logId: UUID.empty(),
        logCategory: 'not_foo',
        logLevel: LogLevel.Warning,
        logCreated: generateTime(),
        logMessage: [],
        logData: {},
      });
      await Task.unsafeRunOk(
        filtered(
          LogRecord({
            ...defaultProps,
            logCategory: 'not_foo',
          })
        )
      );
      expect(handler).not.toHaveBeenCalled();
      await Task.unsafeRunOk(
        filtered(
          LogRecord({
            ...defaultProps,
            logCategory: 'foo',
          })
        )
      );
      expect(handler).not.toHaveBeenLastCalledWith({
        logId: '',
        logCategory: 'foo',
      });
    });
  });
});
