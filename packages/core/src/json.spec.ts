import { describe, it, expect } from '@jest/globals';
import { JSON } from './json.js';
import { Result } from './result.js';

describe('JSON', () => {
  describe(JSON.parse, () => {
    it('should return a Result.Ok for valid JSON', () => {
      expect(JSON.parse('{ "a": true }')).toEqual(Result.Ok({ a: true }));
    });
    it('should return a Result.Error for invalid JSON', () => {
      expect(JSON.parse('{ "a": }')).toEqual(Result.Error(expect.any(SyntaxError)));
    });
  });
  describe(JSON.stringify, () => {
    it('should return a Result.Ok for valid value', () => {
      expect(JSON.stringify({ a: true })).toEqual(Result.Ok('{"a":true}'));
    });
    it('should return a Result.Error for circular dependency', () => {
      const circular = {
        get ref() {
          return this;
        },
      };

      expect(JSON.stringify(circular)).toEqual(Result.Error(expect.any(TypeError)));
    });
  });
});
