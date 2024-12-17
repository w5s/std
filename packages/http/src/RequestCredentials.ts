import type { Enum } from '@w5s/core';
import { define } from '@w5s/core/dist/Enum/define.js';

export const RequestCredentials = define({
  Include: 'include',
  Omit: 'omit',
  SameOrigin: 'same-origin',
});
/**
 * HTTP credentials
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
 */
export type RequestCredentials = Enum.ValueOf<typeof RequestCredentials>;
