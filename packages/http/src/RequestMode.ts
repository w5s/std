import type { Enum } from '@w5s/core/Enum';
import { define } from '@w5s/core/Enum/define';

export const RequestMode = define({
  typeName: 'RequestMode',
  SameOrigin: 'same-origin',
  CORS: 'cors',
  Navigate: 'navigate',
  NoCORS: 'no-cors',
});

/**
 * HTTP referrer policy type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy
 */
export type RequestMode = Enum.ValueOf<typeof RequestMode>;
