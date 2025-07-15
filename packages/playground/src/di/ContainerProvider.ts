import type { ContainerProviderFunction } from './ContainerProviderFunction.js';

/**
 * A container of dependencies.
 */
export type ContainerProvider<Requirement extends object, Key extends string | symbol, Value> = {
  readonly [key in Key]: ContainerProviderFunction<Requirement, Value>;
};
