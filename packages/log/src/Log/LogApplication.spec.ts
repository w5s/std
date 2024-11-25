import { describe, expect, it } from 'vitest';
import { LogApplication } from './LogApplication.js';

describe('LogApplication', () => {
  it('should be an app', () => {
    expect(LogApplication).toEqual(expect.objectContaining({ id: '@w5s/log' }));
  });
});
