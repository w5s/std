import { describe, it, expect } from 'vitest';
import { ANSI } from './ANSI.js';
import { stripEscapeCode } from './ANSI/stripEscapeCode.js';
import { format } from './ANSI/format.js';

describe('ANSI', () => {
  it('is an alias to functions', () => {
    expect(ANSI).toEqual(
      expect.objectContaining({
        format,
        stripEscapeCode,
      }),
    );
  });
});
