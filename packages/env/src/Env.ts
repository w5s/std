/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import type { Option } from '@w5s/core';
import { invariant } from '@w5s/invariant';

const readImportMetaEnv = () => {
  try {
    return (import.meta as { env?: Readonly<{ [key: string]: string }> }).env;
  } catch {
    return undefined;
  }
};
const readProcessEnv = () => globalThis.process?.env as Option<{ [key: string]: string }>;

const createProxy = (properties: Option<{ [key: string]: string }>) =>
  properties == null ? undefined : (Object.assign(Object.create(null), properties) as Env);
const readEnv = (): Env =>
  // NodeJS
  readProcessEnv() ??
  // ESM
  createProxy(readImportMetaEnv()) ??
  invariant(false, 'process.env or import.meta.env must be defined');

/**
 * A dictionary of environment variables
 */
export interface Env {
  [key: string]: Option<string>;
}

/**
 * An object containing the environment variables
 *
 * @example
 * ```ts
 * const NODE_ENV = Env['NODE_ENV'];
 * ```
 */
export const Env: Env = readEnv();
