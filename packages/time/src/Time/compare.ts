import type { Order } from '@w5s/core';
import { primitive } from '@w5s/core/dist/Order/primitive.js';
import type { Time } from './Time.js';

export const compare: Order<Time> = primitive;
