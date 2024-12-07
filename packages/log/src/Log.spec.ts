import { describe, it, expect } from 'vitest';
import { LogApplication } from './Log/LogApplication.js';
import { Log } from './Log.js';

describe('Log', () => {
  it('is an alias to functions', () => {
    expect(Log).toEqual(expect.objectContaining(LogApplication));
  });
});
