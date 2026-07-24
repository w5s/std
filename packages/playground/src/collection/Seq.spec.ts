import { describe, expect, it } from 'vitest';

import { Seq } from './Seq.js';
import { from } from './Seq/from.js';
import { hasInstance } from './Seq/hasInstance.js';
import { of } from './Seq/of.js';

describe('Seq', () => {
  it('has alias to methods', () => {
    expect(Seq).toEqual(
      expect.objectContaining({
        from,
        hasInstance,
        of,
      }),
    );
  });
});
