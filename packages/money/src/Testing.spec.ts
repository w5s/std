import { describe, it, expect } from 'vitest';
import * as Module from './Testing.js';

describe('Testing', () => {
  it('exports', () => {
    expect(Object.keys(Module).toSorted()).toEqual(
      [
        // public exports
        'ANY',
        'anyCurrency',
      ].toSorted(),
    );
  });
});
