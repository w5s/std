import type { Ref } from '@w5s/core';
import { Application, type ApplicationState } from '../Application.js';

type EmptyObject = Readonly<Record<string | symbol, never>>;

export interface ApplicationTest<Configuration = EmptyObject> extends Application<Configuration> {
  /**
   * Ref to store
   */
  readonly store: Ref<Readonly<Record<string, ApplicationState>>>;
}

/**
 * Create new application for test
 *
 * @example
 * ```typescript
 * const app = ApplicationTest(
 *   // 'some-custom-id',
 *   // {}
 * );
 * console.log(app.current);// {}
 * console.log(app.store);// { ['some-id']:  }
 * ```
 * @param id
 * @param initialConfiguration
 * @param store
 */
export function ApplicationTest<Configuration extends Readonly<Record<string | symbol, unknown>> = EmptyObject>(
  id: string,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  initialConfiguration: Configuration = {} as Configuration,
  store: Ref<Record<string, ApplicationState>> = { current: {} },
): ApplicationTest<Configuration> {
  return Object.assign(Application<Configuration>(id, initialConfiguration, store), { store });
}
