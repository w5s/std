import type { Option } from '@w5s/core';
import type { FiberId } from '../FiberId.js';
import type { FiberCallback } from '../FiberCallback.js';

export interface SchedulerFiberState {
  readonly id: FiberId;
  readonly callback: FiberCallback;
  readonly running: boolean;
  readonly generator: Option<Generator>;
  readonly deferred: PromiseWithResolvers<any>;
}
