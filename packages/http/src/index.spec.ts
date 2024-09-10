import { describe, it, expect } from 'vitest';
import * as Fetch from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(Object.keys(Fetch).sort()).toEqual(
      [
        'HTTP',
        'HTTPError',
        'HTTPParser',
        'ReferrerPolicy',
        'RequestCache',
        'RequestCredentials',
        'RequestDestination',
        'RequestHeaders',
        'RequestRedirect',
      ].sort()
    );
  });
});
