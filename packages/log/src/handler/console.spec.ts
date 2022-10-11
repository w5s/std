/* eslint-disable no-console */

import { describe, test, expect, jest } from '@jest/globals';
import { Task } from '@w5s/core';
import { LogLevel } from '../level.js';
import { LogMessage } from '../message.js';
import { generateLogRecord } from '../__stub__.js';
import { ConsoleHandler } from './console.js';

describe('.ConsoleHandler', () => {
  const noop = (): void => undefined;
  jest.spyOn(console, 'debug').mockImplementation(noop);
  jest.spyOn(console, 'trace').mockImplementation(noop);
  jest.spyOn(console, 'info').mockImplementation(noop);
  jest.spyOn(console, 'warn').mockImplementation(noop);
  jest.spyOn(console, 'error').mockImplementation(noop);

  test('should send to console.debug when level=LogLevel.Debug', async () => {
    await Task.unsafeRunOk(ConsoleHandler(generateLogRecord({ logLevel: LogLevel.Debug, logMessage: ['test'] })));
    expect(console.debug).toHaveBeenLastCalledWith('test');
  });

  test('should send to console.info when level=LogLevel.Info', async () => {
    await Task.unsafeRunOk(ConsoleHandler(generateLogRecord({ logLevel: LogLevel.Info, logMessage: ['test'] })));
    expect(console.info).toHaveBeenLastCalledWith('test');
  });

  test('should send to console.warn when level=LogLevel.Warning', async () => {
    await Task.unsafeRunOk(ConsoleHandler(generateLogRecord({ logLevel: LogLevel.Warning, logMessage: ['test'] })));
    expect(console.warn).toHaveBeenLastCalledWith('test');
  });

  test('should send to console.warn when level=LogLevel.Error', async () => {
    await Task.unsafeRunOk(ConsoleHandler(generateLogRecord({ logLevel: LogLevel.Error, logMessage: ['test'] })));
    expect(console.error).toHaveBeenLastCalledWith('test');
  });

  test('should format logCategory and logMessage correctly', async () => {
    await Task.unsafeRunOk(
      ConsoleHandler(
        generateLogRecord({
          logCategory: 'logCategory',
          logLevel: LogLevel.Debug,
          logMessage: LogMessage(['message', LogMessage.Ref('foo', 'bar')]),
        })
      )
    );
    expect(console.debug).toHaveBeenLastCalledWith('[logCategory]', 'message', 'bar');
  });

  test('should not add logCategory if empty', async () => {
    await Task.unsafeRunOk(
      ConsoleHandler(
        generateLogRecord({
          logLevel: LogLevel.Debug,
          logMessage: LogMessage(['message', LogMessage.Ref('foo', 'bar')]),
        })
      )
    );
    expect(console.debug).toHaveBeenLastCalledWith('message', 'bar');
  });
});
