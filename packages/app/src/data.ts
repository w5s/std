import type { Ref, Record, Tag } from '@w5s/core';

type AnyObject = Record<string | symbol, unknown>;
type EmptyObject = Record<string | symbol, never>;

/**
 * Application id type
 */
export type ApplicationId = Tag<string, { applicationId: true }>;

/**
 * Application state generic type
 */
export interface ApplicationState extends AnyObject {
  /**
   * Current application configuration
   */
  readonly configuration: AnyObject;
}

/**
 * Application instance type
 */
export interface Application<Configuration = EmptyObject> extends Ref<ApplicationState> {
  /**
   * Application id
   */
  readonly id: ApplicationId;

  /**
   * Application initial configuration
   */
  readonly initialConfiguration: Configuration;
}
