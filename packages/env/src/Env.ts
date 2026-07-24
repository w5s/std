import type { Option } from '@w5s/core';

import { panic } from '@w5s/error/dist/panic.js';

const readImportMetaEnv = () => {
  try {
    return (import.meta as { env?: Readonly<Record<string, string>> }).env;
  } catch {
    return undefined;
  }
};
const readProcessEnv = () => globalThis.process?.env as Option<Record<string, string>>;

const createProxy = (properties: Option<Record<string, string>>) =>
  properties == null ? undefined : (Object.assign(Object.create(null), properties) as Env);
const readEnv = (): Env =>
  // NodeJS
  readProcessEnv() ??
  // ESM
  createProxy(readImportMetaEnv()) ??
  panic(new ReferenceError('process.env or import.meta.env must be defined'));

/**
 * A dictionary of environment variables
 */
export type Env = Record<string, Option<string>>;

/**
 * An object containing the environment variables
 *
 * @example
 * ```typescript
 * const NODE_ENV = Env['NODE_ENV'];
 * ```
 */
export const Env: Env = readEnv();
