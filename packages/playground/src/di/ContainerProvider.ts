import type { Container } from './Container.js';

/**
 * A container provider
 */
export interface ContainerProvider<Value> {
  (thisContainer: Container): Value;
}
