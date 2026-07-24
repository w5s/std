import { describe, expect, it } from 'vitest';

import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).toSorted((left, right) => left.localeCompare(right))).toMatchInlineSnapshot(`
      [
        "ANSICode",
        "Console",
      ]
    `);
  });
});
