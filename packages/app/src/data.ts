import type { Ref, Record } from '@w5s/core';

type AnyObject = Record<string | symbol, unknown>;

/**
 * Application id type
 */
export type ApplicationId = string;

/**
 * Application state generic type
 */
export type ApplicationState = AnyObject;

/**
 * Application instance type
 */
export interface Application extends Ref<ApplicationState> {
  /**
   * Application id
   */
  readonly id: ApplicationId;
}
