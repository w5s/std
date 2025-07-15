import { describe, it, expect } from 'vitest';
import { ContainerKey } from './ContainerKey.js';

describe(ContainerKey, () => {
  const anyContainer = {};
  it('should be a symbol', () => {
    const provider = () => 'my_implementation';
    expect(ContainerKey('test', provider)).toEqual({
      containerKey: 'test',
      containerDefaultProvider: provider,
    });
  });
  it('should have default provider if omitted', () => {
    const key = ContainerKey('test');
    expect(key.containerDefaultProvider(anyContainer)).toBe(undefined);
  });
});
