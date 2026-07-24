import { describe, expect, it } from 'vitest';

import { of } from './of.js';

describe(of, () => {
  it('should join all parts', () => {
    expect(of('a', 'b', 'c')).toEqual('abc');
  });
});
