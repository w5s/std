import type { ContainerProvider } from './ContainerProvider.js';

/**
 * A container of dependencies.
 */
export interface Container {
  readonly [key: symbol]: ContainerProvider<unknown>;
}
