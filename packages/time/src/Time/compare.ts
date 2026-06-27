import type { Order } from '@w5s/core/Order';
import { primitive } from '@w5s/core/Order/primitive';
import type { Time } from './Time.js';

export const compare: Order<Time> = primitive;
