import type { Order } from '@w5s/core';

import { primitive } from '@w5s/core/dist/Order/primitive.js';

export const compare: Order<number> = primitive;
