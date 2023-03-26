import type { Ref, Record, Tag } from '@w5s/core';
import { useRef } from './globalStorage.js';
import { property } from './property.js';

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
export interface Application<Configuration = EmptyObject> {
  /**
   * Application id
   */
  readonly id: ApplicationId;

  /**
   * Application initial configuration
   */
  readonly initialConfiguration: Configuration;

  /**
   * Reference to current application state
   */
  readonly state: Ref<ApplicationState>;
}

/**
 * Returns an app instance with a state ref that will be stored in `applicationStore.current[id]`
 *
 * @example
 * ```ts
 * const app = Application({
 *   id: 'my-app'
 * });
 * app.current = {
 *   ...app.current,
 *   myProperty: 'hello world !',
 * };
 *
 * ```
 * @param properties
 */
export function Application<Configuration extends AnyObject>(
  properties: Application.Option & Configuration
): Application<Omit<Configuration, keyof Application.Option>> {
  const { id, store, ...initialConfiguration } = properties;
  const initialState: ApplicationState = Object.freeze({
    configuration: initialConfiguration,
  });

  return {
    id: id as ApplicationId,
    initialConfiguration,
    state: store == null ? useRef(`application/${id}`, initialState) : property(store, id, initialState),
  };
}

export namespace Application {
  export type Option = {
    /**
     * Application id
     */
    id: string;

    /**
     * Target store where application will be registered
     */
    store?: Ref<Record<string, ApplicationState>>;
  };

  /**
   * Return the configuration value
   *
   * @example
   * ```ts
   * const app = Application({
   *   id: 'my-app',
   *   myVar: 1
   * });
   * Application.get(app, 'myVar');// 1
   * ```
   * @param app - The application
   * @param key - Configuration key
   */
  export function get<Configuration, Key extends keyof Configuration>(
    app: Application<Configuration>,
    key: Key
  ): Configuration[Key] {
    // @ts-ignore Wrong typing
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return app.state.current.configuration[key];
  }

  /**
   * Return the configuration value
   *
   * @example
   * ```ts
   * const app = Application({
   *   id: 'my-app',
   *   myVar: 1
   * });
   * Application.configure(app, {
   *   myVar: 2
   * });
   * Application.get(app, 'myVar');// 2
   * ```
   * @param app - The application
   * @param patch - Configuration key
   */
  export function configure<C>(app: Application<C>, patch: Partial<C>): void {
    const { state } = app;
    const { current } = state;
    state.current = {
      ...current,
      configuration: {
        ...current.configuration,
        ...patch,
      },
    };
  }
}
