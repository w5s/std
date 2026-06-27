import { primitive } from '@w5s/core/Order/primitive';
import type { Order } from '@w5s/core/Order';
import type { Int } from '../Int.js';

export const compare: Order<Int> = primitive;
