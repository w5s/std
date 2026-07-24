import { describe, expect, it } from 'vitest';

import { Ref } from '../Ref.js';
import { property } from './property.js';

describe(property, () => {
  it('forward getter and setter to sub property', () => {
    const parent = Ref({ bar: 1, foo: true });
    const child = property(parent, 'foo');

    expect(parent).toEqual({ current: { bar: 1, foo: true } });
    expect(child).toEqual({ current: true });
    child.current = false;
    expect(child).toEqual({ current: false });
    expect(parent).toEqual({ current: { bar: 1, foo: false } });
  });
});
