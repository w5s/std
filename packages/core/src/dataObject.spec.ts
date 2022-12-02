import { describe, it, expect } from '@jest/globals';
import { DataObject } from './dataObject.js';

describe('DataObject', () => {
  describe(DataObject.MakeGeneric, () => {
    interface Test {
      _: 'Test';
      email: string;
      optional?: boolean;
    }
    const Test = DataObject.MakeGeneric(
      'Test',
      (create) =>
        (email: string): Test =>
          create({ email })
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
    describe(Test.create, () => {
      it('should return false for instance', () => {
        expect(Test.create({ email: 'foo@bar.com' })).toEqual({ _: 'Test', email: 'foo@bar.com' });
      });
    });
    describe(Test.hasInstance, () => {
      it.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
        expect(Test.hasInstance(value)).toBe(false);
      });
      it('should return false for instance', () => {
        expect(Test.hasInstance(Test(''))).toBe(true);
      });
    });
    describe('==', () => {
      it.each([
        [Test.create({ email: 'foo@bar.com' }), Test.create({ email: 'foo@bar.com' }), true],
        [Test.create({ email: 'foo@bar.com' }), Test.create({ email: 'foo@bar.co' }), false],
      ])('should return false for %s', (left, right, expected) => {
        expect(Test['=='](left, right)).toBe(expected);
      });
    });
  });
  describe(DataObject.Make, () => {
    type Test = DataObject<{ _: 'Test'; email: string }>;
    const Test = DataObject.Make<Test>('Test');
    it('should create a new constructor', () => {
      expect(Test({ email: 'foo@bar.com' })).toEqual({
        _: 'Test',
        email: 'foo@bar.com',
      });
    });
    describe('[DataObject.type]', () => {
      it('should set [DataObject.type]:', () => {
        expect(Test.typeName).toBe('Test');
      });
    });
    describe(Test.hasInstance, () => {
      it.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
        expect(Test.hasInstance(value)).toBe(false);
      });
      it('should return true for instance', () => {
        expect(Test.hasInstance(Test({ email: '' }))).toBe(true);
      });
    });
  });
});
