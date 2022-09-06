import { describe, test, expect } from '@jest/globals';
import * as Fetch from './index.js';

describe('index', () => {
  test('exports', () => {
    expect(Object.keys(Fetch).sort()).toEqual(
      [
        'HTTP',
        'HTTPError',
        'HTTPParser',
        'default', // FIXME: no key exist in reality
      ].sort()
    );
  });
});
