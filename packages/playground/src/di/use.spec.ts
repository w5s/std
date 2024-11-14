import { describe, it, expect } from 'vitest';
import { ContainerKey } from './ContainerKey.js';
import { use } from './use.js';
import { provide } from './provide.js';
import type { Container } from './Container.js';

describe(use, () => {
  interface ServiceA {
    serviceA: string;
  }
  const defaultServiceA: ServiceA = { serviceA: 'defaultA' };
  const ServiceA = ContainerKey<ServiceA>('ServiceA', () => defaultServiceA);

  it('should return default implementation', () => {
    const appContext: Container = {};
    expect(use(appContext, ServiceA)).toBe(defaultServiceA);
  });
  it('should return provider implementation if set', () => {
    const customImplementation: ServiceA = { serviceA: 'bar' };
    const appContext: Container = {
      ...provide(ServiceA, () => customImplementation),
    };
    expect(use(appContext, ServiceA)).toBe(customImplementation);
  });
  it('should return a cached implementation', () => {
    const appContext: Container = {
      ...provide(ServiceA, () => ({ serviceA: 'bar' })),
    };
    const serviceA = use(appContext, ServiceA);
    const serviceASecondCall = use(appContext, ServiceA);
    expect(serviceASecondCall).toBe(serviceA);
  });
  describe('{...} operator', () => {
    it('should override value', () => {
      const appContext: Container = {
        ...provide(ServiceA, () => defaultServiceA),
      };
      const serviceA = use(appContext, ServiceA);
      expect(serviceA).toBe(defaultServiceA);

      const overrideInstance = { serviceA: 'override' };
      const appContextOverride: Container = {
        ...appContext,
        ...provide(ServiceA, () => overrideInstance),
      };
      const serviceAOverride = use(appContextOverride, ServiceA);
      expect(serviceAOverride).toBe(overrideInstance);
    });
  });
});
