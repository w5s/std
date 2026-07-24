import { describe, expect, it } from 'vitest';

import { ContainerKey } from './ContainerKey.js';

describe(ContainerKey, () => {
  const anyContainer = {};
  it('should be a symbol', () => {
    const provider = () => 'my_implementation';
    expect(ContainerKey('test', provider)).toEqual({
      containerDefaultProvider: provider,
      containerKey: 'test',
    });
  });
  it('should have default provider if omitted', () => {
    const key = ContainerKey('test');
    expect(key.containerDefaultProvider(anyContainer)).toBe(undefined);
  });
});
