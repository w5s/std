import { inspect } from 'node:util';
import { describe, expect, it, vi } from 'vitest';

import { Symbol } from '../Symbol.js';
import { Type } from '../Type.js';
import { Struct } from './Struct.js';

describe(Struct, () => {
  const defaultProperties = {
    hasInstance: vi.fn(),
    typeName: 'Foo',
  };
  describe(Struct.create, () => {
    it('returns a new instance', () => {
      const Foo = Type.define<{ foo: boolean }>({
        ...defaultProperties,
      });
      expect(Struct.create(Foo, { foo: true })).toEqual({ foo: true });
    });
  });
  describe('#Symbol(nodejs.util.inspect.custom)', () => {
    it('returns a default representation', () => {
      const Foo = Type.define<{ foo: boolean }>({
        ...defaultProperties,
      });
      const instance = Struct.create(Foo, { foo: true });
      expect(inspect(instance)).toBe('{ foo: true }');
    });
    it('always have _ tag first', () => {
      const Foo = Type.define<{ _: string; foo: boolean }>(defaultProperties);
      const instance = Struct.create(Foo, { _: 'Toto', foo: true });
      expect(inspect(instance)).toBe(`{ _: 'Toto', foo: true }`);
    });
    it('returns a custom representation when specified', () => {
      const FooInspect = Type.define<{ foo: boolean }>({
        ...defaultProperties,
        [Symbol.inspect]: (anyValue) => `Foo { foo: ${anyValue.foo} }`,
      });
      const instance = Struct.create(FooInspect, { foo: true });
      expect(inspect(instance)).toBe('Foo { foo: true }');
    });
  });
  describe('#toString', () => {
    it('returns a default representation', () => {
      const Foo = Type.define<{ foo: boolean }>({
        ...defaultProperties,
      });
      const instance = Struct.create(Foo, { foo: true });

      expect(instance.toString()).toBe('[object Foo]');
    });
    it('returns a custom representation when specified', () => {
      const FooInspect = Type.define<{ foo: boolean }>({
        ...defaultProperties,
        asString: (self) => `foo#${self.foo}`,
      });
      const instance = Struct.create(FooInspect, { foo: true });

      expect(instance.toString()).toBe('foo#true');
    });
  });
});
