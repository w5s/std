import { describe, it, expect } from 'vitest';
import { level } from './level.js';
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
