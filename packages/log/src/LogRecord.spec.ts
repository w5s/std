import { describe, it, expect } from 'vitest';
import { Time } from '@w5s/time';
import { UUID } from '@w5s/uuid';
import { LogRecord } from './LogRecord.js';
import { LogLevel } from './LogLevel.js';
import { LogMessage } from './LogMessage.js';
import { messageWithData } from './LogRecord/messageWithData.js';

describe('LogRecord', () => {
  describe('()', () => {
    it('should return a new message', () => {
      expect(
        LogRecord({
          id: UUID.empty(),
          domain: 'myDomain',
          level: LogLevel.Warn,
          message: LogMessage.of('foo', 'bar', ''),
          data: {},
          created: Time.of(1),
        }),
      ).toEqual({
        _: 'LogRecord',
        id: UUID.empty(),
        domain: 'myDomain',
        level: LogLevel.Warn,
        message: ['foobar'],
        data: {},
        created: 1,
      });
    });
  });
  describe('alias to functions', () => {
    it('should return a new message', () => {
      expect(LogRecord).toEqual(
        expect.objectContaining({
          messageWithData,
        }),
      );
    });
  });
});
