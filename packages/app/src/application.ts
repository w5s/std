import { applicationState } from './state.js';
import type { Application, ConfigurationState } from './data.js';
import { property } from './property.js';

const emptyObject = Object.freeze({});

/**
 * Returns an app instance with a state ref that will be stored in `applicationStore.current[id]`
 *
 * @example
 * ```ts
 * const app = application({ id: 'my-app' });
 * app.current = {
 *   ...app.current,
 *   myProperty: 'hello world !',
 * };
 *
 * ```
 * @param properties
 */
export function application<Configuration extends ConfigurationState>(
  properties: {
    id: Application['id'];
  } & Configuration
): Application<Omit<Configuration, 'id'>> {
  const { id, ...initialConfiguration } = properties;
  const ref = property(applicationState, id, emptyObject);
  // @ts-ignore we are initializing data
  ref.id = id;
  // @ts-ignore we are initializing data
  ref.initialConfiguration = initialConfiguration;
  return ref as Application<Configuration>;
}
