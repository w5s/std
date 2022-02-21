import { DataObject } from './data.js';

describe(DataObject, () => {
  describe('.type', () => {
    test('should be "_type"', () => {
      expect(DataObject.type).toEqual('_type');
    });
  });
  describe('()', () => {
    test('should return a new object', () => {
      const instance = DataObject({ [DataObject.type]: 'Test', foo: true });
      expect(instance).toEqual({ [DataObject.type]: 'Test', foo: true });
      // @ts-expect-error immutable
      instance.foo = false;
      // @ts-expect-error non extensible
      instance.notExistent = false;
    });
  });
  describe(DataObject.MakeGeneric, () => {
    const Test = DataObject.MakeGeneric('Test', (create) => (email: string) => create({ email }));
    test('should create a new constructor', () => {
      expect(Test('foo@bar.com')).toEqual(
        DataObject({
          _type: 'Test',
          email: 'foo@bar.com',
        })
      );
    });
    describe('typeName', () => {
      test('should set typeName', () => {
        expect(Test.typeName).toBe('Test');
      });
    });
    describe(Test.hasInstance, () => {
      test.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
        expect(Test.hasInstance(value)).toBe(false);
      });
      test('should return false for instance', () => {
        expect(Test.hasInstance(Test(''))).toBe(true);
      });
    });
  });
  describe(DataObject.Make, () => {
    type Test = DataObject<{ [DataObject.type]: 'Test'; email: string }>;
    const Test = DataObject.Make<Test>('Test');
    test('should create a new constructor', () => {
      expect(Test({ email: 'foo@bar.com' })).toEqual(
        DataObject({
          [DataObject.type]: 'Test',
          email: 'foo@bar.com',
        })
      );
    });
    describe('[DataObject.type]', () => {
      test('should set [DataObject.type]:', () => {
        expect(Test.typeName).toBe('Test');
      });
    });
    describe(Test.hasInstance, () => {
      test.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
        expect(Test.hasInstance(value)).toBe(false);
      });
      test('should return true for instance', () => {
        expect(Test.hasInstance(Test({ email: '' }))).toBe(true);
      });
    });
  });
});
