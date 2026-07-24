import { describe, expect, it } from 'vitest';

import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module)).toMatchInlineSnapshot(`
      [
        "BigDecimal",
      ]
    `);
  });
});
