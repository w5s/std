import { useConfiguration } from '@w5s/application';

import type { JobProvider } from './JobProvider.js';

import { MemoryJobProvider } from './MemoryJobProvider.js';
import { meta } from './meta.js';

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
