import { describe, it, expect } from 'vitest';
import * as Module from './Testing.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // public exports
        'fakeBodyValue',
        'fakeBodyReader',
      ].sort(),
    );
  });
});
