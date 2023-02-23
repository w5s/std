import { describe, it, expect } from '@jest/globals';
import { application } from './application.js';
import { applicationState } from './state.js';

describe('application', () => {
  const app = application({ id: 'test-app' });

  it('should setup applicationStore', () => {
    expect(applicationState.current).toEqual({
      'test-app': {},
    });
  });
  it('should return a Ref to state', () => {
    expect(app).toEqual({ id: 'test-app', initialConfiguration: {}, current: {} });
  });
  it('should store state in applicationStore', () => {
    app.current = {
      ...app.current,
      foo: true,
    };
    expect(app.current).toEqual({
      foo: true,
    });
    expect(applicationState.current).toEqual({
      'test-app': {
        foo: true,
      },
    });
  });
  it('should return unchanged initialConfiguration', () => {
    const appWithConfiguration = application({ id: 'test-app', foo: 1, bar: 2 });
    expect(appWithConfiguration.initialConfiguration).toEqual({
      foo: 1,
      bar: 2,
    });
  });
});
