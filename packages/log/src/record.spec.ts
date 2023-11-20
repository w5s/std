import { describe, it, expect } from 'vitest';
import { Time } from '@w5s/time';
import { UUID } from '@w5s/random';
import { LogRecord } from './record.js';
import { LogLevel } from './level.js';
import { LogMessage } from './message.js';

describe('LogRecord', () => {
  describe('()', () => {
    it('should return a new message', () => {
      expect(
        LogRecord({
          id: UUID.empty(),
          category: 'category',
          level: LogLevel.Warning,
          message: LogMessage.of('foo', 'bar', ''),
          data: {},
          created: Time.of(1),
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
