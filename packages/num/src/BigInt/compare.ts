import { primitive } from '@w5s/core/dist/Order/primitive.js';
import type { Order } from '@w5s/core';

export const compare: Order<bigint> = primitive;
