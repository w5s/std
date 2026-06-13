import type { Enum } from '@w5s/core/Enum';

import { define } from '@w5s/core/Enum/define';

export const RequestRedirect = define({
  Error: 'error',
  Follow: 'follow',
  Manual: 'manual',
  typeName: 'RequestRedirect',
});

/**
 * HTTP redirect type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/redirect
 */
export type RequestRedirect = Enum.ValueOf<typeof RequestRedirect>;
