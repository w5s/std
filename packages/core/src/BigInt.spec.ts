import { describe, it, expect } from 'vitest';
import { BigInt } from './BigInt.js';
import { describeType } from './testing.js';
import { parse } from './BigInt/parse.js';
import { format } from './BigInt/format.js';

describe('BigInt', () => {
  it('is an alias to functions', () => {
    expect(BigInt).toEqual(
      expect.objectContaining({
        parse,
        format,
        compare: expect.any(Function),
      })
    );
  });
  describeType({ describe, it, expect })(BigInt, {
    typeName: 'BigInt',
    instances: () => [1n, 0n],
    notInstances: () => ['anything', null, undefined, BigInt.hasInstance],
  });
});
