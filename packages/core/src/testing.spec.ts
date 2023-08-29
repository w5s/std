import { describe, it, expect } from 'vitest';
import * as Module from './testing.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // public exports
        'assertType',
        'describeComparable',
        'describeEqual',
        'taskStub',
      ].sort()
    );
  });
});
