import { describe, expect, it } from 'vitest';

import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Module))).toEqual(
      new Set([
        // public exports
        'meta',
        'useConfiguration',
        'useRef',
        'useState',
      ]),
    );
  });
});
