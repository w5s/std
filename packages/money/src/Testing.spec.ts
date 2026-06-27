import { describe, it, expect } from 'vitest';
import * as Module from './Testing.js';

describe('Testing', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Module))).toEqual(
      new Set([
        // public exports
        'ANY',
        'anyCurrency',
      ]),
    );
  });
});
