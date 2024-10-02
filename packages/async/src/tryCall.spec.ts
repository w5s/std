import { describe, expect, it } from 'vitest';
import { tryCall } from './tryCall.js';

describe('tryCall', () => {
  const anyValue = 'foo';
  const anyError = new Error('MockError');

  describe('with async', () => {
    it('returns a promise when resolved', async () => {
      await expect(
        tryCall(
          () => Promise.resolve(anyValue),
          (_) => `${_}_bar`,
        ),
      ).resolves.toEqual(`${anyValue}_bar`);
    });
    it('returns a promise when rejected', async () => {
      await expect(
        tryCall(
          () => Promise.reject(anyError),
          undefined,
          (_) => {
            throw new Error(`${(_ as Error).message}_ext`);
          },
        ),
      ).rejects.toEqual(new Error(`MockError_ext`));
    });
    it('forwards error if no onError', async () => {
      await expect(tryCall(() => Promise.reject(anyError), undefined)).rejects.toEqual(new Error(`MockError`));
    });
  });
  describe('with sync', () => {
    it('returns a value when no throw', () => {
      expect(
        tryCall(
          () => anyValue,
          (_) => `${_}_bar`,
        ),
      ).toEqual(`${anyValue}_bar`);
    });
    it('returns a value when no throw', () => {
      expect(() =>
        tryCall(
          () => {
            throw anyError;
          },
          undefined,
          (_) => {
            throw new Error(`${(_ as Error).message}_ext`);
          },
        ),
      ).toThrow(new Error(`MockError_ext`));
    });
    it('forwards error if no onError', () => {
      expect(() =>
        tryCall(() => {
          throw anyError;
        }, undefined),
      ).toThrow(anyError);
    });
  });
});
