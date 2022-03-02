import * as Module from './index';

describe('index', () => {
  test('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // List of all public exports
        'DatabaseClientError',
        'DatabaseDriver',
        'SQLDataType',
        'SQLQuery',
        'SQLStatement',
        'sql',
        'executeQuery',
        'default', // FIXME: no key exist in reality
      ].sort()
    );
  });
});
