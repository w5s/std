import { describe, it, expect } from 'vitest';
import { ContainerKey } from './ContainerKey.js';
import { use } from './use.js';
import { provide } from './provide.js';
import type { ContainerProvider } from './ContainerProvider.js';
import { pipe } from '../pipe.js';

describe(use, () => {
  interface ServiceA {
    serviceA: string;
  }
  const defaultServiceA: ServiceA = { serviceA: 'defaultA' };
  const overrideServiceA: ServiceA = { serviceA: 'overrideA' };
  const ServiceA = ContainerKey('ServiceA', () => defaultServiceA);
  const ServiceB = ContainerKey('ServiceB');

  it('returns default implementation', () => {
    const appContext = {};
    const serviceA = use(appContext, ServiceA);
    expect(serviceA).toBe(defaultServiceA);
  });
  it('raises type error when key does not exist', () => {
    const appContext = {};
    const ServiceRequired = ContainerKey<'ServiceRequired', () => string>('ServiceRequired');

    // @ts-expect-error ServiceRequired is required
    const serviceA = use(appContext, ServiceRequired);
    expect(serviceA).toBe(undefined);
  });
  it('returns provider implementation if set', () => {
    const customImplementation: ServiceA = { serviceA: 'bar' };
    const appContext = provide(ServiceA, () => customImplementation)({});
    expect(use(appContext, ServiceA)).toBe(customImplementation);
  });
  it('returns a cached implementation', () => {
    const appContext = provide(ServiceA, () => ({ serviceA: 'bar' }))({});
    const serviceA = use(appContext, ServiceA);
    const serviceASecondCall = use(appContext, ServiceA);
    expect(serviceASecondCall).toBe(serviceA);
  });
  it('handles nested providers', () => {
    const customImplementation: ServiceA = { serviceA: 'bar' };
    type ContainerRequire<Key extends ContainerKey<any, any>> = ContainerProvider<
      any,
      Key extends ContainerKey<infer K, any> ? K : never,
      Key extends ContainerKey<any, infer V> ? V : never
    >;

    const appContext = pipe({}).to(
      provide(ServiceA, () => customImplementation),
      provide(ServiceB, (_: ContainerRequire<typeof ServiceA>) => {
        const serviceA = use(_, ServiceA);

        return () => (serviceA.serviceA === 'bar' ? 0 : 1);
      }),
    );

    expect(use(appContext, ServiceA)).toBe(customImplementation);
  });
  describe('{...} operator', () => {
    it('should override value', () => {
      const appContext = provide(ServiceA, () => defaultServiceA)({});
      const serviceA = use(appContext, ServiceA);
      expect(serviceA).toBe(defaultServiceA);

      const appContextOverride = provide(ServiceA, () => overrideServiceA)(appContext);
      const serviceAOverride = use(appContextOverride, ServiceA);
      expect(serviceAOverride).toBe(overrideServiceA);
    });
  });
});
