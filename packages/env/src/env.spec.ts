import { describe, expect, it } from 'vitest';
import { Env } from './env.js';

describe('Env', () => {
  describe.runIf(typeof process !== 'undefined')('when process.env', () => {
    it('get value of process.env', () => {
      process.env['TEST_GET'] = 'Test';
      expect(Env['TEST_GET']).toEqual('Test');
    });
    it('set value of process.env', () => {
      Env['TEST_SET'] = 'FOO';
      expect(process.env['TEST_SET']).toEqual('FOO');
    });
  });
  describe.runIf('env' in import.meta)('when import.meta.env', () => {
    const importEnv = (import.meta as unknown as { env: Env }).env;

    it('get value of import.meta.env', () => {
      importEnv['TEST_GET'] = 'Test';
      expect(Env['TEST_GET']).toEqual('Test');
    });
    it('set value of Env', () => {
      Env['TEST_SET'] = 'FOO';
      expect(Env['TEST_SET']).toEqual('FOO');
    });
    it('keep value of import.meta.env unchanged', () => {
      Env['TEST_SET'] = 'FOO';
      expect(importEnv['TEST_SET']).toEqual(undefined);
    });
  });
});
