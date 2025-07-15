/**
 * A container provider
 */
export interface ContainerProviderFunction<Requirement extends object, Value> {
  (requirement: Requirement): Value;
}
