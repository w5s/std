import type { Enum } from '@w5s/core/Enum';
import { define } from '@w5s/core/Enum/define';

export const RequestCache = define({
  typeName: 'RequestCache',
  Default: 'default',
  NoStore: 'no-store',
  Reload: 'reload',
  NoCache: 'no-cache',
  ForceCache: 'force-cache',
  OnlyIfCached: 'only-if-cached',
});

/**
 * HTTP cache type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
 */
export type RequestCache = Enum.ValueOf<typeof RequestCache>;
