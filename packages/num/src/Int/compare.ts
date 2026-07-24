import type { Order } from '@w5s/core';

import { primitive } from '@w5s/core/dist/Order/primitive.js';

import type { Int } from '../Int.js';

export const compare: Order<Int> = primitive;
