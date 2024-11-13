import { describe, it, expect } from 'vitest';
import { InjectionKey } from './InjectionKey.js';
import type { AppContext } from './AppContext.js';

describe(InjectionKey, () => {
  const anyAppContext: AppContext = {};
  it('should be a symbol', () => {
    const provider = () => 'my_implementation';
    expect(InjectionKey('test', provider)).toEqual({
      injectKey: expect.any(Symbol),
      injectDefault: provider,
    });
  });
  it('should have default provider if omitted', () => {
    const key = InjectionKey('test');
    expect(key.injectDefault(anyAppContext)).toBe(undefined);
  });
});
