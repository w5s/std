import * as Module from './index.js';

describe('index', () => {
  test('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // List of all public exports
        'UUID',
        'default', // FIXME: no key exist in reality
        'randomUUID',
      ].sort()
    );
  });
});
