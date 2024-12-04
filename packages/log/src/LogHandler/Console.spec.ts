/* eslint-disable no-console */

import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/task';
import { LogLevel } from '../LogLevel.js';
import { LogMessage } from '../LogMessage.js';
import { fakeLogRecord } from '../Testing.js';
import { Console } from './Console.js';

describe(Console, () => {
  const noop = (): void => undefined;
  vi.spyOn(console, 'debug').mockImplementation(noop);
  vi.spyOn(console, 'trace').mockImplementation(noop);
  vi.spyOn(console, 'info').mockImplementation(noop);
  vi.spyOn(console, 'warn').mockImplementation(noop);
  vi.spyOn(console, 'error').mockImplementation(noop);

  it('should send to console.debug when level=LogLevel.Debug', async () => {
    await Task.unsafeRunOk(Console()(fakeLogRecord({ level: LogLevel.Debug, message: ['test'] })));
    expect(console.debug).toHaveBeenLastCalledWith('test');
  });

  it('should send to console.info when level=LogLevel.Info', async () => {
    await Task.unsafeRunOk(Console()(fakeLogRecord({ level: LogLevel.Info, message: ['test'] })));
    expect(console.info).toHaveBeenLastCalledWith('test');
  });

  it('should send to console.warn when level=LogLevel.Warning', async () => {
    await Task.unsafeRunOk(Console()(fakeLogRecord({ level: LogLevel.Warning, message: ['test'] })));
    expect(console.warn).toHaveBeenLastCalledWith('test');
  });

  it('should send to console.warn when level=LogLevel.Error', async () => {
    await Task.unsafeRunOk(Console()(fakeLogRecord({ level: LogLevel.Error, message: ['test'] })));
    expect(console.error).toHaveBeenLastCalledWith('test');
  });

  it('should format logCategory and message correctly', async () => {
    await Task.unsafeRunOk(
      Console()(
        fakeLogRecord({
          category: 'logCategory',
          level: LogLevel.Debug,
          message: LogMessage.of('message', { $ref: 'foo' }),
          data: {
            foo: 'bar',
          },
        }),
      ),
    );
    expect(console.debug).toHaveBeenLastCalledWith('[logCategory]', 'message', 'bar');
  });

  it('should not add logCategory if empty', async () => {
    await Task.unsafeRunOk(
      Console()(
        fakeLogRecord({
          level: LogLevel.Debug,
          message: LogMessage.of('message', { $ref: 'foo' }),
          data: {
            foo: 'bar',
          },
        }),
      ),
    );
    expect(console.debug).toHaveBeenLastCalledWith('message', 'bar');
  });
});
