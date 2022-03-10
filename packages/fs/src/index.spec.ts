import * as Module from './index.js';

describe('index', () => {
  test('exports', () => {
    expect(Object.keys(Module).sort()).toEqual(
      [
        // List of all public exports
        'FileSystem',
        'default',
      ].sort()
    );
  });
});
describe('FileSystem', () => {
  test('exports', () => {
    expect(Object.keys(Module.FileSystem).sort()).toEqual(
      [
        // List of all public exports
        'exists',
        'existsSync',
      ].sort()
    );
  });
});
