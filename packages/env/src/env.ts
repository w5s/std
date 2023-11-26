/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import type { Option } from '@w5s/core';
import { invariant } from '@w5s/invariant';

const createEnv = (properties: Readonly<Env>) => Object.assign(Object.create(null), properties) as Env;
const readEnv = (): Env =>
  // NodeJS
  globalThis.process?.env ??
  // ESM
  createEnv(
    (import.meta as { env?: Readonly<Env> }).env ?? invariant(false, 'process.env or import.meta.env must be defined')
  );

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
