import type { Ref } from '@w5s/core';

export interface ConfigurationRef<Configuration> extends Ref<Configuration> {
  /**
   * Initial configuration
   */
  readonly initial: Configuration;

  /**
   * Get a specific configuration value by key
   *
   * @param key the configuration key
   */
  get<Key extends keyof Configuration>(key: Key): Configuration[Key];

  /**
   * Update the configuration by merging the current configuration with the given patch
   *
   * @param patch the partial configuration to merge with the current configuration
   */
  update(patch: Partial<Configuration>): void;

  /**
   * Modify the configuration using a mapping function
   *
   * @param mapFn a function that takes the current configuration and returns a new configuration
   */
  modify(mapFn: (current: Configuration) => Configuration): void;
}
