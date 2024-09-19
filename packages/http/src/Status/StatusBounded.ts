import type { Bounded } from '@w5s/core';
import type { Status } from './Status.js';
import { Continue, NetworkAuthenticationRequired } from './status.all.js';

export const StatusBounded: Bounded<Status> = {
  minValue: Continue,
  maxValue: NetworkAuthenticationRequired,
};
