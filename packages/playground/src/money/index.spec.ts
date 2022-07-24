import { describe, expect, test } from '@jest/globals';
import * as Module from './index.js';

describe('module public API', () => {
  test('should return correct values', () => {
    expect(Module).toEqual({
      Currency: expect.any(Function),
      Money: expect.any(Function),
    });
  });
});
