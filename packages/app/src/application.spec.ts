import { describe, it, expect } from '@jest/globals';
import { application } from './application.js';
import { applicationStore } from './applicationStore.js';

describe('application', () => {
  const app = application({ id: 'test-app' });

  it('should setup applicationStore', () => {
    expect(applicationStore.current).toEqual({
      'test-app': {},
    });
  });
  it('should return a Ref to state', () => {
    expect(app).toEqual({ id: 'test-app', current: {} });
  });
  it('should store state in applicationStore', () => {
    app.current = {
      ...app.current,
      foo: true,
    };
    expect(app.current).toEqual({
      foo: true,
    });
    expect(applicationStore.current).toEqual({
      'test-app': {
        foo: true,
      },
    });
  });
});
