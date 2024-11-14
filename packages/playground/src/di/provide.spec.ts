import { describe, it, expect } from 'vitest';
import { provide } from './provide.js';
import { ContainerKey } from './ContainerKey.js';

describe(provide, () => {
  it('should be a symbol', () => {
    const provider = () => 'my_implementation';
    const SomeService = ContainerKey('SomeService');
    expect(provide(SomeService, provider)).toEqual({
      [SomeService.containerKey]: provider,
    });
  });
});
