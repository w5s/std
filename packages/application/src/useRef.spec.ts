import { describe, expect, it } from 'vitest';
import { Ref } from '@w5s/core';
import { useStorage } from '@w5s/global-storage';
import { useRef } from './useRef.js';

describe('useRef()', () => {
  describe('+ Storage', () => {
    const anyStorage = useStorage({});

    it('should initialize with initial value', () => {
      const ref = useRef(anyStorage, 'some_test_ref', 0);
      expect(ref.current).toBe(0);
      expect(anyStorage.get('some_test_ref')).toBe(0);
    });
    it('should implement set', () => {
      const ref = useRef(anyStorage, 'some_test_ref', 0);
      ref.current += 1;
      expect(ref.current).toBe(1);
      expect(anyStorage.get('some_test_ref')).toBe(1);
    });
  });

  describe('+ Ref', () => {
    it('should initialize value with initialValue', () => {
      const ref = Ref({});
      const prop = useRef(ref, 'counter', 2);
      expect(prop).toEqual({ current: 2 });
      expect(ref).toEqual({ current: { counter: 2 } });
    });
    it('should not set initialValue if already set', () => {
      const ref = Ref({ counter: 1 });
      const prop = useRef(ref, 'counter', 2);
      expect(prop).toEqual({ current: 1 });
      expect(ref).toEqual({ current: { counter: 1 } });
    });
    it('should setup getter/setter', () => {
      const ref = Ref({});
      const prop = useRef(ref, 'counter', 1);
      prop.current += 1;

      expect(prop).toEqual({ current: 2 });
      expect(ref).toEqual({ current: { counter: 2 } });
    });
  });
});
