import type { Enum } from '@w5s/core';

import { define } from '@w5s/core/dist/Enum/define.js';

export const RequestMode = define({
  CORS: 'cors',
  Navigate: 'navigate',
  NoCORS: 'no-cors',
  SameOrigin: 'same-origin',
  typeName: 'RequestMode',
});

/**
 * HTTP referrer policy type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy
 */
export type RequestMode = Enum.ValueOf<typeof RequestMode>;
