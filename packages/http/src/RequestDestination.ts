import type { Enum } from '@w5s/core/Enum';
import { define } from '@w5s/core/Enum/define';

export const RequestDestination = define({
  typeName: 'RequestDestination',
  Empty: '',
  Audio: 'audio',
  AudioWorklet: 'audioworklet',
  Document: 'document',
  Embed: 'embed',
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
