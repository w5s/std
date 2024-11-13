import { describe, it, expect } from 'vitest';
import { provide } from './provide.js';
import { InjectionKey } from './InjectionKey.js';

describe(provide, () => {
  it('should be a symbol', () => {
    const provider = () => 'my_implementation';
    const SomeService = InjectionKey('SomeService');
    expect(provide(SomeService, provider)).toEqual({
      [SomeService.injectKey]: provider,
    });
  });
});
