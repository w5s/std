import type { Bounded } from '@w5s/core/Bounded';

import type { Status } from './Status.js';

import { Continue, NetworkAuthenticationRequired } from './status.all.js';

export const StatusBounded: Bounded<Status> = {
  maxValue: NetworkAuthenticationRequired,
  minValue: Continue,
};
