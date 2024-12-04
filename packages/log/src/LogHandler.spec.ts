import { describe, it, expect } from 'vitest';
import { LogHandler } from './LogHandler.js';
import { filter } from './LogHandler/filter.js';
import { Console } from './LogHandler/Console.js';

describe('LogHandler', () => {
  it('is an alias to functions', () => {
    expect(LogHandler).toEqual(
      expect.objectContaining({
        filter,
        Console,
      }),
    );
  });
});
