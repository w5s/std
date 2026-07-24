import type { Option } from '@w5s/core';

import type { FiberCallback } from '../FiberCallback.js';
import type { FiberId } from '../FiberId.js';

export interface SchedulerFiberState {
  readonly callback: FiberCallback;
  readonly deferred: PromiseWithResolvers<any>;
  readonly generator: Option<Generator>;
  readonly id: FiberId;
  readonly running: boolean;
}
