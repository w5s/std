/**
 * A container provider
 */
export type ContainerProviderFunction<Requirement extends object, Value> = (requirement: Requirement) => Value;
