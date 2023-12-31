import { describe, expect, it } from 'vitest';
import * as Module from './nativeError.js';

describe('Error', () => {
  it('is an alias to globalThis.Error', () => {
    expect(Module.Error).toBe(globalThis.Error);
  });
});
describe('AggregateError', () => {
  it('is an alias to globalThis.AggregateError', () => {
    expect(Module.AggregateError).toBe(globalThis.AggregateError);
  });
});
describe('EvalError', () => {
  it('is an alias to globalThis.EvalError', () => {
    expect(Module.EvalError).toBe(globalThis.EvalError);
  });
});
describe('RangeError', () => {
  it('is an alias to globalThis.RangeError', () => {
    expect(Module.RangeError).toBe(globalThis.RangeError);
  });
});
describe('ReferenceError', () => {
  it('is an alias to globalThis.ReferenceError', () => {
    expect(Module.ReferenceError).toBe(globalThis.ReferenceError);
  });
});
describe('SyntaxError', () => {
  it('is an alias to globalThis.SyntaxError', () => {
    expect(Module.SyntaxError).toBe(globalThis.SyntaxError);
  });
});
describe('TypeError', () => {
  it('is an alias to globalThis.TypeError', () => {
    expect(Module.TypeError).toBe(globalThis.TypeError);
  });
});
describe('URIError', () => {
  it('is an alias to globalThis.URIError', () => {
    expect(Module.URIError).toBe(globalThis.URIError);
  });
});
