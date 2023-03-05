import { describe, expect, it } from 'vitest';
import { application } from './application.js';

describe('app', () => {
  it('should be an app', () => {
    expect(application).toEqual(expect.objectContaining({ id: '@w5s/money' }));
  });
});
