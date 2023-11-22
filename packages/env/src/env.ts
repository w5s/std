/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import type { Option } from '@w5s/core';

const createEnv = (properties: any) => Object.assign(Object.create(null), properties) as Env;

/**
 * A readonly dictionary of environment variables
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
export const Env: Env = (() =>
  // NodeJS
  globalThis.process?.env ??
  // ESM
  createEnv((import.meta as { env?: Env }).env))();
