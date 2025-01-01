import { describe, it, expect } from 'vitest';
import { Seq } from './Seq.js';
import { of } from './Seq/of.js';
import { from } from './Seq/from.js';
import { hasInstance } from './Seq/hasInstance.js';

describe('Seq', () => {
  it('has alias to methods', () => {
    expect(Seq).toEqual(
      expect.objectContaining({
        of,
        from,
        hasInstance,
      }),
    );
  });
});
