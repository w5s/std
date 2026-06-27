import type { Order } from '@w5s/core/Order';
import { primitive } from '@w5s/core/Order/primitive';
import type { TimeDuration } from './TimeDuration.js';

export const compare: Order<TimeDuration> = primitive;
