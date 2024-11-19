import { describe, it, expect } from 'vitest';
import { LogMessage, LogMessageRef } from './LogMessage.js';

describe(LogMessage, () => {
  describe('()', () => {
    it('should create a new instance', () => {
      expect(LogMessage('foo')).toEqual(['foo']);
    });
    it('should collapse strings', () => {
      expect(LogMessage('foo', 'bar', LogMessageRef('var'), 'baz', '!')).toEqual(['foobar', { $ref: 'var' }, 'baz!']);
    });
  });
  describe(LogMessage.of, () => {
    it('should create a new instance', () => {
      expect(LogMessage.of('foo')).toEqual(['foo']);
    });
    it('should collapse strings', () => {
      expect(LogMessage.of('foo', 'bar', LogMessageRef('var'), 'baz', '!')).toEqual([
        'foobar',
        { $ref: 'var' },
        'baz!',
      ]);
    });
  });
});
