import type { Enum } from '@w5s/core';

import { define } from '@w5s/core/dist/Enum/define.js';

export const RequestCache = define({
  Default: 'default',
  ForceCache: 'force-cache',
  NoCache: 'no-cache',
  NoStore: 'no-store',
  OnlyIfCached: 'only-if-cached',
  Reload: 'reload',
  typeName: 'RequestCache',
});

/**
 * HTTP cache type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
 */
export type RequestCache = Enum.ValueOf<typeof RequestCache>;
