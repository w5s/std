import { describe, it, expect } from 'vitest';
import { Ref } from '@w5s/core';
import { Application } from './Application.js';
import { useStorage } from './useStorage.js';

describe('Application', () => {
  const globalStorage = useStorage(globalThis);
  const generateId = () => Math.round(Math.random() * 2 ** 32).toString(36);
  const generateAppId = () => `test-app-${generateId()}`;
  const _target = Ref({});
  const _app = Application({ id: 'test-app', configuration: {}, store: _target });

  it('should setup globalStorage', () => {
    const id = `test-app-${generateId()}`;
    Application({ id, configuration: { foo: 'bar' } });
    expect(globalStorage).toEqual(
      new Map([
        [
          `application/${id}`,
          {
            configuration: { foo: 'bar' },
          },
        ],
      ]),
    );
  });
  it('should setup target if provided', () => {
    const id = generateAppId();
    const target = Ref({});
    Application({ id, configuration: { foo: 'bar' }, store: target });
    expect(target.current).toEqual({
      [`application/${id}`]: {
        configuration: { foo: 'bar' },
      },
    });
  });
  it('should return a Ref to state', () => {
    const target = Ref({});
    const id = generateAppId();
    expect(Application({ id, store: target, configuration: { foo: 1, bar: 2 } })).toEqual({
      id,
      configuration: {
        foo: 1,
        bar: 2,
      },
      state: {
        current: {
          configuration: {
            foo: 1,
            bar: 2,
          },
        },
      },
    });
  });
  it('should store state in applicationStore', () => {
    _app.state.current = {
      ..._app.state.current,
      foo: true,
    };
    expect(_app.state.current).toEqual({
      configuration: {},
      foo: true,
    });
    expect(_target.current).toEqual({
      'application/test-app': {
        configuration: {},
        foo: true,
      },
    });
  });
  it('should return unchanged configuration', () => {
    const target = Ref({});
    const id = generateAppId();
    const appWithConfiguration = Application({ id, store: target, configuration: { foo: 1, bar: 2 } });
    expect(appWithConfiguration.configuration).toEqual({
      foo: 1,
      bar: 2,
    });
  });

  describe('.get()', () => {
    it('should return configuration', () => {
      const target = Ref({});
      const id = generateAppId();
      const app = Application({ id, store: target, configuration: { foo: 1 } });
      const value = Application.get(app, 'foo');
      expect(value).toBe(1);
    });
  });
  describe('.configure()', () => {
    it('should set configuration', () => {
      const target = Ref({});
      const id = generateAppId();
      const app = Application({
        id,
        store: target,
        configuration: { foo: 'foo_value', bar: 'bar_value', baz: 'baz_value' },
      });
      app.state.current = {
        ...app.state.current,
        state: true,
      };
      Application.configure(app, { foo: 'foo_value_ext', bar: 'bar_value_ext' });

      expect(app.state.current).toEqual({
        configuration: {
          bar: 'bar_value_ext',
          baz: 'baz_value',
          foo: 'foo_value_ext',
        },
        state: true,
      });
    });
  });
});
