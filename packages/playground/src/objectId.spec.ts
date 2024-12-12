import { describe, it, expect } from 'vitest';
import { objectId } from './objectId.js';

describe('objectId', () => {
  it('is idempotent', () => {
    const anyObject = {};
    const id = objectId(anyObject);
    expect(typeof id).toBe('number');
    expect(objectId(anyObject)).toBe(id);
  });
  it('returns an integer value', () => {
    const id = objectId({});
    expect(Math.round(id) === id).toBe(true);
  });
  it('returns a new value for different object', () => {
    expect(objectId({})).not.toBe(objectId({}));
  });
  it('is compatible with functions', () => {
    const anyFunction = () => null;
    const id = objectId(anyFunction);
    expect(typeof id).toBe('number');
    expect(objectId(anyFunction)).toBe(id);
  });
  it('is compatible with symbol', () => {
    const symbol = Symbol('foo');
    const id = objectId(symbol);
    expect(typeof id).toBe('number');
    expect(objectId(symbol)).toBe(id);
  });
  it('should return an integer value', () => {
    const id = objectId({});
    expect(Math.round(id) === id).toBe(true);
  });
});
