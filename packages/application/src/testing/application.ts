import type { Ref, Record } from '@w5s/core';
import { Application, type ApplicationState } from '../application.js';

export interface ApplicationTest<Configuration = Record<string | symbol, never>> extends Application<Configuration> {
  /**
   * Ref to store
   */
  readonly store: Ref<Record<string, ApplicationState>>;
}

/**
 * Create new application for test
 *
 * @example
 * ```ts
 * const app = ApplicationTest({
 *   // id: 'some-id',
 *   // initialConfiguration: {}
 * });
 * console.log(app.current);// {}
 * console.log(app.store);// { ['some-id']:  }
 * ```
 * @param properties
 */
export function ApplicationTest<Configuration extends Record<string | symbol, unknown>>(
  properties: ApplicationTest.Option & Configuration
): ApplicationTest<Omit<Configuration, keyof ApplicationTest.Option>> {
  const { id = 'app', store = { current: {} }, ...otherProperties } = properties;

  return Object.assign(
    Application<Configuration>(
      // @ts-ignore
      { id, store, ...otherProperties }
    ),
    { store }
  );
}

export namespace ApplicationTest {
  export type Option = {
    /**
     * Application id
     */
    id?: string;

    /**
     * Target store where application will be registered
     */
    store?: Ref<Record<string, ApplicationState>>;
  };
}
