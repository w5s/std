import type { Ref, Tag } from '@w5s/core';
import { useStorage } from '@w5s/global-storage';
import { useRef } from './useRef.js';

type AnyObject = Readonly<Record<string | symbol, unknown>>;
type EmptyObject = Readonly<Record<string | symbol, never>>;

/**
 * Application id type
 */
export type ApplicationId = string & Tag<'ApplicationId'>;

/**
 * Application state generic type
 */
export interface ApplicationState extends AnyObject {}

/**
 * Minimal Application interface
 */
export interface ApplicationRef {
  /**
   * Application id
   */
  readonly id: ApplicationId;
  /**
   * Ref to application state
   */
  readonly state: Ref<ApplicationState>;
}

/**
 * Application instance type
 */
export interface Application<Configuration = EmptyObject> extends ApplicationRef {
  /**
   * Application initial configuration
   */
  readonly initialConfiguration: Configuration;
  /**
   * Return the configuration value
   *
   * @example
   * ```typescript
   * const app = Application('my-app', {
   *   myVar: 1
   * });
   * app.configure({
   *   myVar: 2
   * });
   * app.get('myVar');// 2
   * ```
   * @param updater - Configuration updater
   */
  configure(updater: Partial<Configuration>): void;
  /**
   * Return the configuration value
   *
   * @example
   * ```typescript
   * const app = Application('my-app', {
   *   myVar: 1
   * });
   * app.get(app, 'myVar');// 1
   * ```
   * @param key - Configuration key
   */
  get<Key extends keyof Configuration>(key: Key): Configuration[Key];
}

/**
 * Returns an app instance with a state ref that will be stored in `applicationStore.current[id]`
 *
 * @example
 * ```typescript
 * interface MyAppConfiguration {
 *   foo: number
 * }
 *
 * const myApp = Application<MyAppConfiguration>('my-app', {
 *   foo: 1,
 * });
 * myApp.configure({ foo: 2 });
 *
 * myApp.state.current = {
 *   ...myApp.state.current,
 *   myProperty: 'hello world !',
 * };
 * ```
 * @param id - Application unique identifier
 * @param initialConfiguration - Application initial configuration
 * @param store - Application store ref where the data will be set
 */
export function Application<Configuration extends object = EmptyObject>(
  id: string,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  initialConfiguration: Configuration = {} as Configuration,
  store?: Ref<Readonly<Record<string, ApplicationState>>>,
): Application<Configuration> {
  const initialState = Object.freeze({});
  const state = useRef(store == null ? useStorage(globalThis) : store, `application/${id}`, initialState);
  const configuration = useRef(state, 'configuration', initialConfiguration);

  function configure(patch: Partial<Configuration>): void {
    configuration.current = {
      ...configuration.current,
      ...patch,
    };
  }

  function get<Key extends keyof Configuration>(key: Key): Configuration[Key] {
    // @ts-ignore Wrong typing
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return state.current.configuration[key];
  }

  return {
    id: id as ApplicationId,
    initialConfiguration,
    get,
    configure,
    state,
  };
}
