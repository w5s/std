import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // All keys
        'FiberId',
        'Fiber',
      ].sort(),
    );
  });
});
