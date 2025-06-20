import type { Char } from '../Char.js';
import type { Order } from '../Order.js';
import { primitive } from '../Order/primitive.js';

export const compare: Order<Char> = primitive;
