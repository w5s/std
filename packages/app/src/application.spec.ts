import { describe, it, expect } from '@jest/globals';
import { Ref } from '@w5s/core';
import { application } from './application.js';
import { globalStorage } from './globalStorage.js';

describe('application', () => {
  const generateId = () => Math.round(Math.random() * 2 ** 32).toString(36);
  const generateAppId = () => `test-app-${generateId()}`;
  const targetRef = Ref({});
  const app = application({ id: 'test-app', target: targetRef });

  it('should setup globalStorage', () => {
    const id = `test-app-${generateId()}`;
    application({ id, foo: 'bar' });
    expect(globalStorage).toEqual(
      new Map([
        [
          `application/${id}`,
          {
            configuration: { foo: 'bar' },
            state: {},
          },
        ],
      ])
    );
  });
  it('should setup target if provided', () => {
    const id = generateAppId();
    const target = Ref({});
    application({ id, foo: 'bar', target });
    expect(target.current).toEqual({
      [id]: {
        configuration: { foo: 'bar' },
        state: {},
      },
    });
  });
  it('should return a Ref to state', () => {
    const target = Ref({});
    const id = generateAppId();
    expect(application({ id, target, foo: 1, bar: 2 })).toEqual({
      id,
      initialConfiguration: {
        foo: 1,
        bar: 2,
      },
      current: {},
    });
  });
  it('should store state in applicationStore', () => {
    app.current = {
      ...app.current,
      foo: true,
    };
    expect(app.current).toEqual({
      foo: true,
    });
    expect(targetRef.current).toEqual({
      'test-app': {
        configuration: {},
        state: {
          foo: true,
        },
      },
    });
  });
  it('should return unchanged initialConfiguration', () => {
    const target = Ref({});
    const id = generateAppId();
    const appWithConfiguration = application({ id, target, foo: 1, bar: 2 });
    expect(appWithConfiguration.initialConfiguration).toEqual({
      foo: 1,
      bar: 2,
    });
  });
});
