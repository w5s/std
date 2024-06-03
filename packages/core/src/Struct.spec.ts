import { describe, it, expect } from 'vitest';
import { Struct } from './Struct.js';

describe('Struct', () => {
  describe('.MakeGeneric()', () => {
    interface Test {
      _: 'Test';
      email: string;
      optional?: boolean;
    }
    const Test = Struct.defineWith(
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
    describe('#typeName', () => {
      it('should set typeName', () => {
        expect(Test.typeName).toBe('Test');
      });
    });
    describe('#create()', () => {
      it('should return false for instance', () => {
        expect(Test.create({ email: 'foo@bar.com' })).toEqual({ _: 'Test', email: 'foo@bar.com' });
      });
    });
    describe('#hasInstance', () => {
      it.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
        expect(Test.hasInstance(value)).toBe(false);
      });
      it('should return false for instance', () => {
        expect(Test.hasInstance(Test(''))).toBe(true);
      });
    });
    describe('#from', () => {
      it('returns Option.None when hasInstance(value) is false', () => {
        expect(Test.from(Test.create({ email: 'foo@bar.com' }))).toEqual(Test.create({ email: 'foo@bar.com' }));
        expect(Test.from(1)).toBe(undefined);
      });
    });
  });
  describe('.Make()', () => {
    type Test = Struct<{ _: 'Test'; email: string }>;
    const Test = Struct.define<Test>('Test');
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
