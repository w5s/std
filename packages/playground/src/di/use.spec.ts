import { describe, it, expect } from 'vitest';
import { InjectionKey } from './InjectionKey.js';
import { use } from './use.js';
import { provide } from './provide.js';
import type { AppContext } from './AppContext.js';

describe(use, () => {
  interface ServiceA {
    serviceA: string;
  }
  const defaultServiceA: ServiceA = { serviceA: 'defaultA' };
  const ServiceA = InjectionKey<ServiceA>('ServiceA', () => defaultServiceA);

  it('should return default implementation', () => {
    const appContext: AppContext = {};
    expect(use(appContext, ServiceA)).toBe(defaultServiceA);
  });
  it('should return provider implementation if set', () => {
    const customImplementation: ServiceA = { serviceA: 'bar' };
    const appContext: AppContext = {
      ...provide(ServiceA, () => customImplementation),
    };
    expect(use(appContext, ServiceA)).toBe(customImplementation);
  });
  it('should return a cached implementation', () => {
    const appContext: AppContext = {
      ...provide(ServiceA, () => ({ serviceA: 'bar' })),
    };
    const serviceA = use(appContext, ServiceA);
    const serviceASecondCall = use(appContext, ServiceA);
    expect(serviceASecondCall).toBe(serviceA);
  });
  describe('{...} operator', () => {
    it('should override value', () => {
      const appContext: AppContext = {
        ...provide(ServiceA, () => defaultServiceA),
      };
      const serviceA = use(appContext, ServiceA);
      expect(serviceA).toBe(defaultServiceA);

      const overrideInstance = { serviceA: 'override' };
      const appContextOverride: AppContext = {
        ...appContext,
        ...provide(ServiceA, () => overrideInstance),
      };
      const serviceAOverride = use(appContextOverride, ServiceA);
      expect(serviceAOverride).toBe(overrideInstance);
    });
  });
});
