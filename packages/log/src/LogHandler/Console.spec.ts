import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/task';
import { withTask } from '@w5s/task/dist/Testing.js';
import { LogLevel } from '../LogLevel.js';
import { LogMessage } from '../LogMessage.js';
import { fakeLogRecord } from '../Testing.js';
import { Console } from './Console.js';

describe(Console, () => {
  const fakeWebConsole = () => ({
    debug: vi.fn(() => Task.resolve()),
    info: vi.fn(() => Task.resolve()),
    log: vi.fn(() => Task.resolve()),
    warn: vi.fn(() => Task.resolve()),
    error: vi.fn(() => Task.resolve()),
    isWeb: vi.fn(() => true),
  });
  const expectTask = withTask(expect);

  describe('[web]', () => {
    const console = fakeWebConsole();
    const consoleHandler = Console({
      console,
      colors: false,
    });
    const defaultRecord = fakeLogRecord({ level: LogLevel.Debug, message: LogMessage('foobar') });

    it('should send to console.debug when level=LogLevel.Debug', async () => {
      expectTask(consoleHandler({ ...defaultRecord, level: LogLevel.Debug })).toResolveSync(undefined);
      expect(console.debug).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z', 'DEBUG', 'foobar');
    });
    it('should send to console.info when level=LogLevel.Info', async () => {
      expectTask(consoleHandler({ ...defaultRecord, level: LogLevel.Info })).toResolveSync(undefined);
      expect(console.info).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z', 'INFO', 'foobar');
    });
    it('should send to console.warn when level=LogLevel.Warn', async () => {
      expectTask(consoleHandler({ ...defaultRecord, level: LogLevel.Warn })).toResolveSync(undefined);
      expect(console.warn).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z', 'WARN', 'foobar');
    });
    it('should send to console.error when level=LogLevel.Error', async () => {
      expectTask(consoleHandler({ ...defaultRecord, level: LogLevel.Error })).toResolveSync(undefined);
      expect(console.error).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z', 'ERROR', 'foobar');
    });
    it('should send to console.error when level=LogLevel.Critical', async () => {
      expectTask(consoleHandler({ ...defaultRecord, level: LogLevel.Critical })).toResolveSync(undefined);
      expect(console.error).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z', 'CRITICAL', 'foobar');
    });
    it('should format logCategory and message correctly', async () => {
      expectTask(
        consoleHandler(
          fakeLogRecord({
            domain: 'myDomain',
            level: LogLevel.Debug,
            message: LogMessage('message=', { $ref: 'foo' }, '.'),
            data: {
              foo: 'bar',
            },
          }),
        ),
      ).toResolveSync(undefined);
      expect(console.debug).toHaveBeenLastCalledWith(
        '1970-01-01T00:00:00.000Z',
        'DEBUG',
        '[myDomain]',
        'message=',
        'bar',
        '.',
      );
    });
    it('should not add logCategory if empty', async () => {
      expectTask(
        consoleHandler(
          fakeLogRecord({
            level: LogLevel.Debug,
            message: LogMessage('message=', { $ref: 'foo' }, '.'),
            data: {
              foo: 'bar',
            },
          }),
        ),
      ).toResolveSync(undefined);
      expect(console.debug).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z', 'DEBUG', 'message=', 'bar', '.');
    });
  });
});
