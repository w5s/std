import { Enum } from '@w5s/core/dist/Enum.js';

export const RequestRedirect = Enum.define({
  Follow: 'follow',
  Error: 'error',
  Manual: 'manual',
});
/**
 * HTTP redirect type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/redirect
 */
export type RequestRedirect = Enum.ValueOf<typeof RequestRedirect>;
