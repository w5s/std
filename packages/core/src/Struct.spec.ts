import { describe, it, expect } from 'vitest';
import { Struct } from './Struct.js';
import { Callable } from './Callable.js';

describe('Struct', () => {
  describe(Struct.define, () => {
    type Test = Struct<{ _: 'Test'; email: string }>;
    const Test = Struct.define<Test>('Test');
    it('should create a new constructor', () => {
      expect(Test({ email: 'foo@bar.com' })).toMatchObject({
        _: 'Test',
        email: 'foo@bar.com',
      });
    });
    describe('[Callable.symbol]', () => {
      it('should an alias to .create:', () => {
        expect(Test[Callable.symbol]).toBe(Test.create);
      });
    });
    describe('.create', () => {
      it('returns a new instance', () => {
        expect(Test.create({ email: 'foo@bar.com' })).toMatchObject({
          _: 'Test',
          email: 'foo@bar.com',
        });
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
