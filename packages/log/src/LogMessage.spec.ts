import { describe, it, expect } from 'vitest';
import { LogMessage } from './LogMessage.js';

describe(LogMessage, () => {
  describe('()', () => {
    it('should create a new instance', () => {
      expect(LogMessage('foo')).toEqual(['foo']);
    });
    it('should collapse strings', () => {
      expect(LogMessage('foo', 'bar', { $ref: 'var' }, 'baz', '!')).toEqual(['foobar', { $ref: 'var' }, 'baz!']);
    });
  });
  describe(LogMessage.of, () => {
    it('should create a new instance', () => {
      expect(LogMessage.of('foo')).toEqual(['foo']);
    });
    it('should collapse strings', () => {
      expect(LogMessage.of('foo', 'bar', { $ref: 'var' }, 'baz', '!')).toEqual(['foobar', { $ref: 'var' }, 'baz!']);
    });
  });
});
