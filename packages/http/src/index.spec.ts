import { describe, it, expect } from 'vitest';
import * as Fetch from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Fetch))).toEqual(
      new Set([
        'HTTPError',
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
        'ResponseParser',
        'ResponseType',
      ]),
    );
  });
});
