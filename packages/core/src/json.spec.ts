import { JSON } from './json.js';
import { Result } from './result.js';

describe('JSON', () => {
  describe(JSON.parse, () => {
    test('should return a Result.Ok for valid JSON', () => {
      expect(JSON.parse('{ "a": true }')).toEqual(Result.Ok({ a: true }));
    });
    test('should return a Result.Error for invalid JSON', () => {
      expect(JSON.parse('{ "a": }')).toEqual(Result.Error(new SyntaxError('Unexpected token } in JSON at position 7')));
    });
  });
  describe(JSON.stringify, () => {
    test('should return a Result.Ok for valid value', () => {
      expect(JSON.stringify({ a: true })).toEqual(Result.Ok('{"a":true}'));
    });
    test('should return a Result.Error for circular dependency', () => {
      const circular = {
        get ref() {
          return this;
        },
      };

      expect(JSON.stringify(circular)).toEqual(Result.Error(expect.any(TypeError)));
    });
  });
});
