import { describe, expect, it } from '@jest/globals';
import { app } from './app.js';

describe('app', () => {
  it('should be an app', () => {
    expect(app).toEqual(expect.objectContaining({ id: '@w5s/money' }));
  });
});
