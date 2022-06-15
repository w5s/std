import { describe, test, expect } from '@jest/globals';
import * as Fetch from './index.js';

describe('index', () => {
  test('exports', () => {
    expect(Object.keys(Fetch).sort()).toEqual(
      [
        'HTTPClient',
        'parseArrayBuffer',
        'parseBlob',
        'parseFormData',
        'parseJSON',
        'parseText',
        'default', // FIXME: no key exist in reality
      ].sort()
    );
  });
});
