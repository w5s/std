import { describe, expect, it } from 'vitest';
import { RequestMode } from './RequestMode.js';

describe('RequestMode', () => {
  it('is an enum', () => {
    expect(RequestMode).toMatchSnapshot();
  });
});
