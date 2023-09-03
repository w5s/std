import { describe, it, expect } from 'vitest';
import { LogMessage } from './message.js';

describe('LogMessage', () => {
  describe('create()', () => {
    it('should create a new instance', () => {
      expect(LogMessage.create(['foo'])).toEqual(['foo']);
    });
    it('should collapse strings', () => {
      expect(LogMessage.create(['foo', 'bar', ['var', true], 'baz', '!'])).toEqual(['foobar', ['var', true], 'baz!']);
    });
  });
  describe('of()', () => {
    it('should create a new instance', () => {
      expect(LogMessage.of('foo')).toEqual(['foo']);
    });
    it('should collapse strings', () => {
      expect(LogMessage.of('foo', 'bar', ['var', true], 'baz', '!')).toEqual(['foobar', ['var', true], 'baz!']);
    });
  });
  describe('.data', () => {
    it('should return an empty object if empty array', () => {
      expect(LogMessage.data(LogMessage.create([]))).toEqual({});
    });

    it('should return a well formed structure', () => {
      expect(LogMessage.data(LogMessage.create([['foo', 'fooVal'], 'str', ['bar', 'barVal']]))).toEqual({
        foo: 'fooVal',
        bar: 'barVal',
      });
    });
  });
});
