import { describe, expect, it } from 'vitest';

import * as Fetch from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Fetch))).toEqual(
      new Set([
        'Client',
        'Headers',
        'HTTPError',
        'ReferrerPolicy',
        'RequestCache',
        'RequestCredentials',
        'RequestDestination',
        'RequestRedirect',
        'requestSend',
        'Response',
        'ResponseParser',
        'ResponseType',
        'Status',
      ]),
    );
  });
});
