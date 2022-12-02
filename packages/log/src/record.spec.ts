import { describe, it, expect } from '@jest/globals';
import { Time } from '@w5s/core';
import { UUID } from '@w5s/uuid';
import { LogRecord } from './record.js';
import { LogLevel } from './level.js';
import { LogMessage } from './message.js';

describe(LogRecord, () => {
  describe('()', () => {
    it('should return a new message', () => {
      expect(
        LogRecord({
          id: UUID.empty(),
          category: 'category',
          level: LogLevel.Warning,
          message: LogMessage(['foo', 'bar', '']),
          data: {},
          created: Time(1),
        })
      ).toEqual({
        _: 'LogRecord',
        id: UUID.empty(),
        category: 'category',
        level: LogLevel.Warning,
        message: ['foobar'],
        data: {},
        created: 1,
      });
    });
  });
});
