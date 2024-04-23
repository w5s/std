import { describe, it, expect } from 'vitest';
import { BigInt } from './BigInt.js';
import { describeType } from '../testing.js';

describe('BigInt', () => {
  describeType({ describe, it, expect })(BigInt, {
    typeName: 'BigInt',
    instances: () => [1n, 0n],
    notInstances: () => ['anything', null, undefined, BigInt.hasInstance],
  });
});
