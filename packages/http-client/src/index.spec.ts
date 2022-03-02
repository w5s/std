import * as Fetch from './index';

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
