import { describe, test, expect } from '@jest/globals';
import { Time } from '@w5s/core';
import { UUID } from '@w5s/uuid';
import { LogRecord } from './record.js';
import { LogLevel } from './level.js';
import { LogMessage } from './message.js';

describe(LogRecord, () => {
  describe('()', () => {
    test('should return a new message', () => {
      expect(
        LogRecord({
          logId: UUID.empty(),
          logCategory: 'category',
          logLevel: LogLevel.Warning,
          logMessage: LogMessage(['foo', 'bar', '']),
          logData: {},
          logCreated: Time(1),
        })
      ).toEqual({
        logId: UUID.empty(),
        logCategory: 'category',
        logLevel: LogLevel.Warning,
        logMessage: ['foobar'],
        logData: {},
        logCreated: 1,
      });
    });
  });
});
