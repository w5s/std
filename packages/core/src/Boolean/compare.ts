import type { Order } from '../Order.js';
import { primitive } from '../Order/primitive.js';

export const compare: Order<boolean> = primitive;
