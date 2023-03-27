import type { Ref, Record, EmptyObject } from '@w5s/core';
import { Application, type ApplicationState } from '../application.js';

const generateAppId = () => `app-${Math.round(Math.random() * 2 ** 32).toString(36)}`;

export interface ApplicationTest<Configuration = EmptyObject> extends Application<Configuration> {
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
 *   // id: 'some-custom-id',
 *   // configuration: {}
 * });
 * console.log(app.current);// {}
 * console.log(app.store);// { ['some-id']:  }
 * ```
 * @param properties
 */
export function ApplicationTest<Configuration extends Record<string | symbol, unknown> = EmptyObject>(
  properties?: ApplicationTest.Options<Configuration>
): ApplicationTest<Configuration> {
  const { id = generateAppId(), store = { current: {} }, configuration } = properties ?? {};

  return Object.assign(Application<Configuration>({ id, store, configuration }), { store });
}

export namespace ApplicationTest {
  export type Options<Configuration extends Record<string | symbol, unknown>> = Partial<
    Application.Options<Configuration>
  >;
}
