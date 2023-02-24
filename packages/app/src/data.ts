import type { Ref, Record } from '@w5s/core';

type AnyObject = Record<string | symbol, unknown>;
type EmptyObject = Record<string | symbol, never>;

/**
 * Application id type
 */
export type ApplicationId = string;

/**
 * Application state generic type
 */
export interface ApplicationState {
  /**
   * Current application configuration
   */
  readonly configuration: AnyObject;
  /**
   * Current application state
   */
  readonly state: AnyObject;
}

/**
 * Application instance type
 */
export interface Application<Configuration = EmptyObject> extends Ref<ApplicationState['state']> {
  /**
   * Application id
   */
  readonly id: ApplicationId;

  /**
   * Application initial configuration
   */
  readonly initialConfiguration: Configuration;
}
