import { Enum } from '@w5s/core/dist/Enum.js';

export const RequestCache = Enum.define({
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
