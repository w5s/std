import { describe, it, expect, vi } from 'vitest';
import { Ref } from './ref.js';
import { cancel } from './cancel.js';

describe('.cancel', () => {
  it('should run the canceler function', () => {
    const fn = vi.fn();
    const canceler = Ref(fn);
    cancel(canceler);
    expect(fn).toHaveBeenCalledOnce();
  });

  it('should handle gracefully exceptions', () => {
    const fn = vi.fn(() => {
      throw new Error('SomeError');
    });
    const canceler = Ref(fn);
    expect(() => {
      cancel(canceler);
    }).toThrow();
    expect(canceler.current).toBe(undefined);
  });
});
