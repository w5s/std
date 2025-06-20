import type { Order } from '@w5s/core';
import { primitive } from '@w5s/core/dist/Order/primitive.js';
import type { TimeDuration } from './TimeDuration.js';

export const compare: Order<TimeDuration> = primitive;
