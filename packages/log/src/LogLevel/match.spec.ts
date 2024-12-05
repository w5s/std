import { describe, it, expect } from 'vitest';
import { match } from './match.js';
import { LogLevelValue } from './LogLevelValue.js';

describe(match, () => {
  it('should return undefined if empty cases', () => {
    expect(match([])(LogLevelValue.Critical)).toBe(undefined);
  });
  it('should return default value if defined', () => {
    expect(match([], 'defaultValue')(LogLevelValue.Critical)).toBe('defaultValue');
  });
  it('should return value if level exact value is found', () => {
    const matcherFunction = match([
      [LogLevelValue.Warning, 'foo'],
      [LogLevelValue.Error, 'bar'],
      [LogLevelValue.Critical, 'baz'],
    ]);
    expect(matcherFunction(LogLevelValue.Error)).toBe('bar');
  });
  it('should select first superior or equal matcher', () => {
    const matcherFunction = match([
      [LogLevelValue.Warning, 'foo'],
      [LogLevelValue.Error, 'bar'],
      [LogLevelValue.Critical, 'baz'],
    ]);

    expect(matcherFunction(LogLevelValue.Error)).toBe('bar');
    expect(matcherFunction(LogLevelValue.Warning)).toBe('foo');
    expect(matcherFunction(LogLevelValue.Info)).toBe(undefined);
  });

  it('should return defaultValue if no matcher is fulfilled', () => {
    const matcherFunction = match(
      [
        [LogLevelValue.Warning, 'foo'],
        [LogLevelValue.Error, 'bar'],
        [LogLevelValue.Critical, 'baz'],
      ],
      'defaultValue',
    );
    expect(matcherFunction(LogLevelValue.Info)).toBe('defaultValue');
  });
});
