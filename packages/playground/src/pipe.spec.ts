import { describe, expect, it } from 'vitest';
import { pipe } from './pipe.js';

describe('pipe', () => {
  const f = (n: number) => n + 1;
  const g = (n: number) => n * 2;
  it('should pipe value to the .to() function', () => {
    expect(pipe(2).to()).toBe(2);
    expect(pipe(2).to(f)).toBe(3);
    expect(pipe(2).to(f, g)).toBe(6);
    expect(pipe(2).to(f, g, f)).toBe(7);
    expect(pipe(2).to(f, g, f, g)).toBe(14);
    expect(pipe(2).to(f, g, f, g, f)).toBe(15);
    expect(pipe(2).to(f, g, f, g, f, g)).toBe(30);
    expect(pipe(2).to(f, g, f, g, f, g, f)).toBe(31);
    expect(pipe(2).to(f, g, f, g, f, g, f, g)).toBe(62);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f)).toBe(63);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g)).toBe(126);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f)).toBe(127);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g)).toBe(254);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(255);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(510);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(511);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(1022);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(1023);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(2046);
    expect(pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(2047);
    // this is just to satisfy noImplicitReturns and 100% coverage
  });
  it('should throw error for arity > 20', () => {
    expect(() => {
      // @ts-expect-error the arity is out of bound
      pipe(2).to(f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g);
    }).toThrow(new TypeError('Wrong arity'));
  });
});
