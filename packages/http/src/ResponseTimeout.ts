import type { Type } from '@w5s/core';
import { constant } from '@w5s/core/dist/Type/constant.js';
import { union } from '@w5s/core/dist/Type/union.js';
import { TimeDuration } from '@w5s/time/dist/TimeDuration/TimeDuration.js';

export const ResponseTimeout = union(constant('none'), constant('default'), TimeDuration);

export type ResponseTimeout = Type.TypeOf<typeof ResponseTimeout>;
