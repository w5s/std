import { describe, it, expect } from 'vitest';
import { InjectionKey } from './InjectionKey.js';
import { use } from './use.js';
import { provide } from './provide.js';
import type { AppContext } from './AppContext.js';

describe(use, () => {
  interface SomeService {
    serviceMethod(): string;
  }
  const defaultImplementation: SomeService = { serviceMethod: () => 'foo' };
  const SomeService = InjectionKey<SomeService>('SomeService', () => defaultImplementation);

  it('should return default implementation', () => {
    const appContext: AppContext = {};
    expect(use(appContext, SomeService)).toBe(defaultImplementation);
  });
  it('should return provider implementation if set', () => {
    const customImplementation: SomeService = { serviceMethod: () => 'bar' };
    const appContext: AppContext = {
      ...provide(SomeService, () => customImplementation),
    };
    expect(use(appContext, SomeService)).toBe(customImplementation);
  });
  it('should return a cached implementation', () => {
    const appContext: AppContext = {
      ...provide(SomeService, () => ({ serviceMethod: () => 'bar' })),
    };
    const someService = use(appContext, SomeService);
    const someServiceSecondCall = use(appContext, SomeService);
    expect(someServiceSecondCall).toBe(someService);
  });
});
