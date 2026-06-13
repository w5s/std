import type { Enum } from '@w5s/core/Enum';

import { define } from '@w5s/core/Enum/define';

export const RequestDestination = define({
  Audio: 'audio',
  AudioWorklet: 'audioworklet',
  Document: 'document',
  Embed: 'embed',
  Empty: '',
  Font: 'font',
  Frame: 'frame',
  Iframe: 'iframe',
  Image: 'image',
  Manifest: 'manifest',
  Object: 'object',
  PaintWorklet: 'paintworklet',
  Report: 'report',
  Script: 'script',
  SharedWorker: 'sharedworker',
  Style: 'style',
  Track: 'track',
  typeName: 'RequestDestination',
  Video: 'video',
  Worker: 'worker',
  XSLT: 'xslt',
});

/**
 * HTTP destination
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/destination
 */
export type RequestDestination = Enum.ValueOf<typeof RequestDestination>;
