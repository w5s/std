import { describe, test, expect } from '@jest/globals';
import { HTTPError } from './error.js';

describe(HTTPError.InvalidURL, () => {
  test('should constructor new error', () => {
    expect(HTTPError.InvalidURL({ message: 'test', input: 'abc' })).toEqual(
      expect.objectContaining({
        _: 'DataError',
        name: 'HTTPInvalidURLError',
        message: 'test',
        input: 'abc',
      })
    );
  });
});
describe(HTTPError.NetworkError, () => {
  test('should constructor new error', () => {
    expect(HTTPError.NetworkError({ message: 'test' })).toEqual(
      expect.objectContaining({
        _: 'DataError',
        name: 'HTTPNetworkError',
        message: 'test',
      })
    );
  });
});
describe(HTTPError.ParserError, () => {
  test('should constructor new error', () => {
    expect(HTTPError.ParserError({ message: 'test' })).toEqual(
      expect.objectContaining({
        _: 'DataError',
        name: 'HTTPParserError',
        message: 'test',
      })
    );
  });
});
