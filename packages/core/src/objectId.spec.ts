import { describe, test, expect } from '@jest/globals';
import { objectId } from './objectId.js';

describe(objectId, () => {
  test('should return an immutable value', () => {
    const anyObject = {};
    const id = objectId(anyObject);
    expect(typeof id).toBe('number');
    expect(objectId(anyObject)).toBe(id);
  });
  test('should return an integer value', () => {
    const id = objectId({});
    expect(Math.round(id) === id).toBe(true);
  });
  test('should return a new value for different object', () => {
    expect(objectId({})).not.toBe(objectId({}));
  });
  test('should be compatible with functions', () => {
    const anyFunction = () => null;
    const id = objectId(anyFunction);
    expect(typeof id).toBe('number');
    expect(objectId(anyFunction)).toBe(id);
  });
});
