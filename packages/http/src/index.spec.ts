import { describe, it, expect } from 'vitest';
import * as Fetch from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Fetch).sort()).toEqual(
      [
        'HTTPError',
        'HTTPParser',
        'Client',
        'ReferrerPolicy',
        'RequestCache',
        'RequestCredentials',
        'RequestDestination',
        'Headers',
        'RequestRedirect',
        'requestSend',
        'Status',
        'Response',
        'ResponseType',
      ].sort()
    );
  });
});
