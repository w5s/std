import { Enum } from '@w5s/core/dist/Enum.js';

export const RequestMode = Enum.define({
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
