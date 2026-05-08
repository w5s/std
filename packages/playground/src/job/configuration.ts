import { useConfiguration } from '@w5s/application';
import { meta } from './meta.js';
import { MemoryJobProvider } from './MemoryJobProvider.js';
import type { JobProvider } from './JobProvider.js';

export interface Configuration {
  /**
   * The JobProvider instance to be used for managing job queues and execution.
   */
  readonly provider: JobProvider;
}

/**
 * Log Application reference
 */
export const configuration = useConfiguration<Configuration>(meta, {
  provider: new MemoryJobProvider(),
});
