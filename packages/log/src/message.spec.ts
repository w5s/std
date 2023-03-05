import { describe, it, expect } from '@jest/globals';
import { LogMessage } from './message.js';

describe('LogMessage', () => {
  describe('()', () => {
    it('should create a new instance', () => {
      expect(LogMessage(['foo'])).toEqual(['foo']);
    });
    it('should collapse strings', () => {
      expect(LogMessage(['foo', 'bar', LogMessage.Ref('var', true), 'baz', '!'])).toEqual([
        'foobar',
        LogMessage.Ref('var', true),
        'baz!',
      ]);
    });
  });

  describe('.data', () => {
    it('should return an empty object if empty array', () => {
      expect(LogMessage.data(LogMessage([]))).toEqual({});
    });

    it('should return a well formed structure', () => {
      expect(
        LogMessage.data(LogMessage([LogMessage.Ref('foo', 'fooVal'), 'str', LogMessage.Ref('bar', 'barVal')]))
      ).toEqual({
        foo: 'fooVal',
        bar: 'barVal',
      });
    });
  });
});
