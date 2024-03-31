import { describe, it, expect } from 'vitest';
import { Struct } from './Struct.js';

describe('Struct', () => {
  describe('.MakeGeneric()', () => {
    interface Test {
      _: 'Test';
      email: string;
      optional?: boolean;
    }
    const Test = Struct.MakeGeneric(
      'Test',
      (_) =>
        (email: string): Test => ({ _, email })
    );
    it('should create a new constructor', () => {
      expect(Test('foo@bar.com')).toEqual({
        _: 'Test',
        email: 'foo@bar.com',
      });
    });
    describe('typeName', () => {
      it('should set typeName', () => {
        expect(Test.typeName).toBe('Test');
      });
    });
    describe('.create()', () => {
      it('should return false for instance', () => {
        expect(Test.create({ email: 'foo@bar.com' })).toEqual({ _: 'Test', email: 'foo@bar.com' });
      });
    });
    describe('.hasInstance()', () => {
      it.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
        expect(Test.hasInstance(value)).toBe(false);
      });
      it('should return false for instance', () => {
        expect(Test.hasInstance(Test(''))).toBe(true);
      });
    });
  });
  describe('.Make()', () => {
    type Test = Struct<{ _: 'Test'; email: string }>;
    const Test = Struct.Make<Test>('Test');
    it('should create a new constructor', () => {
      expect(Test({ email: 'foo@bar.com' })).toEqual({
        _: 'Test',
        email: 'foo@bar.com',
      });
    });
    describe('[Struct.type]', () => {
      it('should set [Struct.type]:', () => {
        expect(Test.typeName).toBe('Test');
      });
    });
    describe('.hasInstance()', () => {
      it.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
        expect(Test.hasInstance(value)).toBe(false);
      });
      it('should return true for instance', () => {
        expect(Test.hasInstance(Test({ email: '' }))).toBe(true);
      });
    });
  });
});
