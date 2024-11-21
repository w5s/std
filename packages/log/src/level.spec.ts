import { describe, it, expect } from 'vitest';
import { critical, debug, error, info, level, warning } from './level.js';
import { LogLevel } from './LogLevel.js';
import { LogMessage, LogMessageRef } from './LogMessage.js';

describe(level, () => {
  it('returns a factory from level', () => {
    const fooValue = 'fooValue';
    const barValue = 'barValue';
    const message = level(LogLevel.Critical)`foo=${['foo', fooValue]},bar=${['bar', barValue]}`;

    expect(message).toEqual({
      level: LogLevel.Critical,
      message: LogMessage('foo=', LogMessageRef('foo'), ',bar=', LogMessageRef('bar')),
      data: {
        bar: barValue,
        foo: fooValue,
      },
    });
  });
  it('has .withData that adds more data', () => {
    const message = level(LogLevel.Critical).withData({ foo: 'foo_value' })`bar=${['bar', 'bar_value']}`;

    expect(message).toEqual({
      level: LogLevel.Critical,
      message: LogMessage('bar=', LogMessageRef('bar')),
      data: {
        bar: 'bar_value',
        foo: 'foo_value',
      },
    });
  });
  it('returns a factory from level value', () => {
    const fooValue = 'fooValue';
    const barValue = 'barValue';
    const message = level('critical')`foo=${['foo', fooValue]},bar=${['bar', barValue]}`;

    expect(message).toEqual({
      level: LogLevel.Critical,
      message: LogMessage('foo=', LogMessageRef('foo'), ',bar=', LogMessageRef('bar')),
      data: {
        bar: barValue,
        foo: fooValue,
      },
    });
  });
});
describe(critical, () => {
  it('returns a parameter factory', () => {
    expect(critical`test`).toEqual(
      expect.objectContaining({
        level: LogLevel.Critical,
        message: ['test'],
      }),
    );
  });
});
describe(error, () => {
  it('returns a parameter factory', () => {
    expect(error`test`).toEqual(
      expect.objectContaining({
        level: LogLevel.Error,
        message: ['test'],
      }),
    );
  });
});
describe(warning, () => {
  it('returns a parameter factory', () => {
    expect(warning`test`).toEqual(
      expect.objectContaining({
        level: LogLevel.Warning,
        message: ['test'],
      }),
    );
  });
});
describe(info, () => {
  it('returns a parameter factory', () => {
    expect(info`test`).toEqual(
      expect.objectContaining({
        level: LogLevel.Info,
        message: ['test'],
      }),
    );
  });
});
describe(debug, () => {
  it('returns a parameter factory', () => {
    expect(debug`test`).toEqual(
      expect.objectContaining({
        level: LogLevel.Debug,
        message: ['test'],
      }),
    );
  });
});
