import type { Order } from '@w5s/core/Order';

import { primitive } from '@w5s/core/Order/primitive';

export const compare: Order<number> = primitive;
