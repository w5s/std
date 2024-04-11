import { describe, expect, it } from 'vitest';
import { Type } from './Type.js';

describe('Type', () => {
  const TestType = Type.define<string>({
    typeName: 'String',
    hasInstance: (anyValue) => typeof anyValue === 'string',
  });

  describe('define', () => {
    describe('#typeName', () => {
      it('returns the type', () => {
        expect(TestType.typeName).toBe('String');
      });
    });
    describe('#hasInstance', () => {
      it('returns predicate function', () => {
        expect(TestType.hasInstance('')).toBe(true);
        expect(TestType.hasInstance(null)).toBe(false);
      });
    });
  });
});
