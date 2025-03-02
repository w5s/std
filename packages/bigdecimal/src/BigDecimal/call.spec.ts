import { describe, it, expect } from 'vitest';
import { call } from './call.js';

describe(call, () => {
  it('constructs from string', () => {
    expect(call('2')).toEqual(call(2n, 0));
    expect(call('-2')).toEqual(call(-2n, 0));
    expect(call('0.123')).toEqual(call(123n, 3));
    expect(call('200')).toEqual(call(200n, 0));
    expect(call('20000000')).toEqual(call(20_000_000n, 0));
    expect(call('-20000000')).toEqual(call(-20_000_000n, 0));
    expect(call('2.00')).toEqual(call(200n, 2));
    expect(call('0.0000200')).toEqual(call(200n, 7));
    // expect(call('')).toEqual(BigDecimal.normalize(call(0n, 0)));
    // @ts-expect-error A is not valid
    expect(() => call('A')).toThrow(new TypeError('A is not a valid BigDecimal'));
    expect(() => call('1E5')).toThrow(new TypeError('1E5 is not a valid BigDecimal'));
  });
});
