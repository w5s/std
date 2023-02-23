import { describe, it, expect } from '@jest/globals';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // public exports
        'globalStorage',
        'GlobalStorage',
        'property',
        'useRef',
        'application',
      ].sort()
    );
  });
});
