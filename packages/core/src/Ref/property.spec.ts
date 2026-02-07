import { describe, it, expect } from 'vitest';
import { property } from './property.js';
import { Ref } from '../Ref.js';

describe(property, () => {
  it('forward getter and setter to sub property', () => {
    const parent = Ref({ foo: true, bar: 1 });
    const child = property(parent, 'foo');

    expect(parent).toEqual({ current: { foo: true, bar: 1 } });
    expect(child).toEqual({ current: true });
    child.current = false;
    expect(child).toEqual({ current: false });
    expect(parent).toEqual({ current: { foo: false, bar: 1 } });
  });
});
