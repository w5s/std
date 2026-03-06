import { describe, expect, it } from 'vitest';
import { application } from './application.js';

describe('RandomApplication', () => {
  it('should be an app', () => {
    expect(application).toEqual(expect.objectContaining({ id: '@w5s/random' }));
  });
});
