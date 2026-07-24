import { Time } from '@w5s/time';
import { UUID } from '@w5s/uuid';
import { describe, expect, it } from 'vitest';

import { LogLevel } from './LogLevel.js';
import { LogMessage } from './LogMessage.js';
import { LogRecord } from './LogRecord.js';
import { messageWithData } from './LogRecord/messageWithData.js';

describe('LogRecord', () => {
  describe('()', () => {
    it('should return a new message', () => {
      expect(
        LogRecord({
          created: Time.of(1),
          data: {},
          domain: 'myDomain',
          id: UUID.empty(),
          level: LogLevel.Warn,
          message: LogMessage.of('foo', 'bar', ''),
        }),
      ).toEqual({
        _: 'LogRecord',
        created: 1,
        data: {},
        domain: 'myDomain',
        id: UUID.empty(),
        level: LogLevel.Warn,
        message: ['foobar'],
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
