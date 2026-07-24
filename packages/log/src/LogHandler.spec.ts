import { describe, expect, it } from 'vitest';

import { LogHandler } from './LogHandler.js';
import { Console } from './LogHandler/Console.js';
import { filter } from './LogHandler/filter.js';

describe('LogHandler', () => {
  it('is an alias to functions', () => {
    expect(LogHandler).toEqual(
      expect.objectContaining({
        Console,
        filter,
      }),
    );
  });
});
