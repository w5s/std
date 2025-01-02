import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/task';
import { LogLevel } from '../LogLevel.js';
import { LogMessage } from '../LogMessage.js';
import { fakeLogRecord } from '../Testing.js';
import { Console } from './Console.js';

describe(Console, () => {
  const fakeWebConsole = () => ({
    debug: vi.fn(),
    info: vi.fn(),
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  });
  const fakeNodeJSConsole = () => ({
    _stderr: { write: vi.fn() },
    _stdout: { write: vi.fn() },
    ...fakeWebConsole(),
  });

  describe('[web]', () => {
    const console = fakeWebConsole();
    const consoleHandler = Console({
      console,
    });
    const defaultRecord = fakeLogRecord({ level: LogLevel.Debug, message: LogMessage('foobar') });

    it('should send to console.debug when level=LogLevel.Debug', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Debug }));
      expect(console.debug).toHaveBeenLastCalledWith('foobar');
    });
    it('should send to console.info when level=LogLevel.Info', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Info }));
      expect(console.info).toHaveBeenLastCalledWith('foobar');
    });
    it('should send to console.warn when level=LogLevel.Warn', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Warn }));
      expect(console.warn).toHaveBeenLastCalledWith('foobar');
    });
    it('should send to console.error when level=LogLevel.Error', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Error }));
      expect(console.error).toHaveBeenLastCalledWith('foobar');
    });
    it('should send to console.error when level=LogLevel.Critical', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Critical }));
      expect(console.error).toHaveBeenLastCalledWith('foobar');
    });
    it('should format logCategory and message correctly', async () => {
      await Task.unsafeRunOk(
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
      );
      expect(console.debug).toHaveBeenLastCalledWith('[myDomain]', 'message=', 'bar', '.');
    });
    it('should not add logCategory if empty', async () => {
      await Task.unsafeRunOk(
        consoleHandler(
          fakeLogRecord({
            level: LogLevel.Debug,
            message: LogMessage('message=', { $ref: 'foo' }, '.'),
            data: {
              foo: 'bar',
            },
          }),
        ),
      );
      expect(console.debug).toHaveBeenLastCalledWith('message=', 'bar', '.');
    });
  });
  describe('[nodejs]', () => {
    const console = fakeNodeJSConsole();
    const consoleHandler = Console({
      console,
    });
    const defaultRecord = fakeLogRecord({ level: LogLevel.Debug, message: LogMessage('foo', 'bar') });

    it('should send to console.debug when level=LogLevel.Debug', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Debug }));
      expect(console._stdout.write).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z DEBUG foobar\n');
    });
    it('should send to console.info when level=LogLevel.Info', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Info }));
      expect(console._stdout.write).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z INFO foobar\n');
    });
    it('should send to console.warn when level=LogLevel.Warning', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Warn }));
      expect(console._stderr.write).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z WARN foobar\n');
    });
    it('should send to console.error when level=LogLevel.Error', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Error }));
      expect(console._stderr.write).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z ERROR foobar\n');
    });
    it('should send to console.error when level=LogLevel.Critical', async () => {
      await Task.unsafeRunOk(consoleHandler({ ...defaultRecord, level: LogLevel.Critical }));
      expect(console._stderr.write).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z CRITICAL foobar\n');
    });
    it('should format logCategory and message correctly', async () => {
      await Task.unsafeRunOk(
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
      );
      expect(console._stdout.write).toHaveBeenLastCalledWith(
        '1970-01-01T00:00:00.000Z DEBUG [myDomain] message= bar .\n',
      );
    });
    it('should not add logCategory if empty', async () => {
      await Task.unsafeRunOk(
        consoleHandler(
          fakeLogRecord({
            level: LogLevel.Debug,
            message: LogMessage('message=', { $ref: 'foo' }, '.'),
            data: {
              foo: 'bar',
            },
          }),
        ),
      );
      expect(console._stdout.write).toHaveBeenLastCalledWith('1970-01-01T00:00:00.000Z DEBUG message= bar .\n');
    });
  });
});
