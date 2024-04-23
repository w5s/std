import { describe, expect, it } from 'vitest';
import { Deferred } from './Deferred.js';

describe('Deferred', () => {
  const anyValue = 'hello_world';
  const anyError = 'test_error';

  describe('#promise', () => {
    it('is a Promise instance', () => {
      const deferred = new Deferred();
      expect(deferred.promise).toBeInstanceOf(Promise);
    });
  });
  describe('#resolve', () => {
    it('should resolve', async () => {
      const deferred = new Deferred<string>();
      deferred.resolve(anyValue);

      await expect(deferred.promise).resolves.toEqual(anyValue);
    });
  });
  describe('#reject', () => {
    it('should reject', async () => {
      const deferred = new Deferred<string>();
      deferred.reject(anyError);

      await expect(deferred.promise).rejects.toEqual(anyError);
    });
  });
  describe('#isFulfilled', () => {
    it('should return true when resolve was called', () => {
      const deferred = new Deferred<string>();
      expect(deferred.isFulfilled()).toBe(false);
      deferred.resolve(anyValue);
      expect(deferred.isFulfilled()).toBe(true);
    });
    it('should return true when reject was called', async () => {
      const deferred = new Deferred();
      expect(deferred.isFulfilled()).toBe(false);
      deferred.reject(anyError);
      expect(deferred.isFulfilled()).toBe(true);
      await expect(deferred.promise).rejects.toEqual(anyError);
    });
  });
});
