import { describe, it, expect } from 'vitest';
import * as Module from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Module).toSorted()).toEqual(
      [
        // public exports
        'useRef',
        'Application',
      ].toSorted(),
    );
  });
});
