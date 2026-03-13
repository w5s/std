import type { Ref } from '@w5s/core';

export interface ConfigurationRef<Configuration> extends Ref<Configuration> {
  /**
   * Initial configuration
   */
  readonly initial: Configuration;

  get<Key extends keyof Configuration>(key: Key): Configuration[Key];
  update(patch: Partial<Configuration>): void;
  modify(fn: (current: Configuration) => Configuration): void;
}
