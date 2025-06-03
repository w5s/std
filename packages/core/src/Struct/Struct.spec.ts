import { describe, it, expect, vi } from 'vitest';
import { inspect } from 'node:util';
import { Struct } from './Struct.js';
import { Type } from '../Type.js';
import { Symbol } from '../Symbol.js';

describe(Struct, () => {
  const defaultProperties = {
    typeName: 'Foo',
    hasInstance: vi.fn(),
  };
  describe(Struct.create, () => {
    it('returns a new instance', () => {
      const Foo = Type.define<{ foo: boolean }>({
        ...defaultProperties,
      });
      expect(Struct.create(Foo, { foo: true }));
    });
  });
  describe('#Symbol(nodejs.util.inspect.custom)', () => {
    it('returns a default representation', () => {
      const Foo = Type.define<{ foo: boolean }>({
        ...defaultProperties,
      });
      const instance = Struct.create(Foo, { foo: true });
      expect(inspect(instance)).toBe('Struct [Foo] { foo: true }');
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
