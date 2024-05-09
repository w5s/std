import { describe, it, expect } from 'vitest';
import { Number } from './Number.js';
import { describeType } from './testing.js';
import { parse } from './Number/parse.js';
import { format } from './Number/format.js';

describe('Number', () => {
  it('is an alias to functions', () => {
    expect(Number).toEqual(
      expect.objectContaining({
        parse,
        format,
      })
    );
  });
  describeType({ describe, it, expect })(Number, {
    typeName: 'Number',
    instances: () => [0, -1, globalThis.Number.NaN],
    notInstances: () => ['', null, undefined],
  });
});
