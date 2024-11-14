import { describe, it, expect } from 'vitest';
import { ContainerKey } from './ContainerKey.js';
import type { Container } from './Container.js';

describe(ContainerKey, () => {
  const anyContainer: Container = {};
  it('should be a symbol', () => {
    const provider = () => 'my_implementation';
    expect(ContainerKey('test', provider)).toEqual({
      containerKey: expect.any(Symbol),
      containerDefaultProvider: provider,
    });
  });
  it('should have default provider if omitted', () => {
    const key = ContainerKey('test');
    expect(key.containerDefaultProvider(anyContainer)).toBe(undefined);
  });
});
