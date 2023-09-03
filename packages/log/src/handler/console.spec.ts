/* eslint-disable no-console */

import { describe, it, expect, vi } from 'vitest';
import { unsafeRunOk } from '@w5s/core';
import { LogLevel } from '../level.js';
import { LogMessage } from '../message.js';
import { generateLogRecord } from '../__stub__.js';
import { ConsoleHandler } from './console.js';

describe('.ConsoleHandler', () => {
  const noop = (): void => undefined;
  vi.spyOn(console, 'debug').mockImplementation(noop);
  vi.spyOn(console, 'trace').mockImplementation(noop);
  vi.spyOn(console, 'info').mockImplementation(noop);
  vi.spyOn(console, 'warn').mockImplementation(noop);
  vi.spyOn(console, 'error').mockImplementation(noop);

  it('should send to console.debug when level=LogLevel.Debug', async () => {
    await unsafeRunOk(ConsoleHandler(generateLogRecord({ level: LogLevel.Debug, message: ['test'] })));
    expect(console.debug).toHaveBeenLastCalledWith('test');
  });

  it('should send to console.info when level=LogLevel.Info', async () => {
    await unsafeRunOk(ConsoleHandler(generateLogRecord({ level: LogLevel.Info, message: ['test'] })));
    expect(console.info).toHaveBeenLastCalledWith('test');
  });

  it('should send to console.warn when level=LogLevel.Warning', async () => {
    await unsafeRunOk(ConsoleHandler(generateLogRecord({ level: LogLevel.Warning, message: ['test'] })));
    expect(console.warn).toHaveBeenLastCalledWith('test');
  });

  it('should send to console.warn when level=LogLevel.Error', async () => {
    await unsafeRunOk(ConsoleHandler(generateLogRecord({ level: LogLevel.Error, message: ['test'] })));
    expect(console.error).toHaveBeenLastCalledWith('test');
  });

  it('should format logCategory and message correctly', async () => {
    await unsafeRunOk(
      ConsoleHandler(
        generateLogRecord({
          category: 'logCategory',
          level: LogLevel.Debug,
          message: LogMessage.of('message', ['foo', 'bar']),
        })
      )
    );
    expect(console.debug).toHaveBeenLastCalledWith('[logCategory]', 'message', 'bar');
  });

  it('should not add logCategory if empty', async () => {
    await unsafeRunOk(
      ConsoleHandler(
        generateLogRecord({
          level: LogLevel.Debug,
          message: LogMessage.of('message', ['foo', 'bar']),
        })
      )
    );
    expect(console.debug).toHaveBeenLastCalledWith('message', 'bar');
  });
});
