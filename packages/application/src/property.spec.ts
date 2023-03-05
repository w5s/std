import { describe, it, expect } from 'vitest';
import { Ref } from '@w5s/core';
import { property } from './property.js';

describe('property', () => {
  it('should initialize value with initialValue', () => {
    const ref = Ref({});
    const prop = property(ref, 'counter', 2);
    expect(prop).toEqual({ current: 2 });
    expect(ref).toEqual({ current: { counter: 2 } });
  });
  it('should not set initialValue if already set', () => {
    const ref = Ref({ counter: 1 });
    const prop = property(ref, 'counter', 2);
    expect(prop).toEqual({ current: 1 });
    expect(ref).toEqual({ current: { counter: 1 } });
  });
  it('should setup getter/setter', () => {
    const ref = Ref({});
    const prop = property(ref, 'counter', 1);
    prop.current += 1;

    expect(prop).toEqual({ current: 2 });
    expect(ref).toEqual({ current: { counter: 2 } });
  });
});
