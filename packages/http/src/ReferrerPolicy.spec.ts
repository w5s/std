import { describe, expect, it } from 'vitest';
import { ReferrerPolicy } from './ReferrerPolicy.js';

describe('ReferrerPolicy', () => {
  it('is an enum', () => {
    expect(ReferrerPolicy).toMatchSnapshot();
  });
});
