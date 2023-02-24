import type { Ref } from '@w5s/core';
import { useRef } from './globalStorage.js';
import type { Application, ApplicationState } from './data.js';
import { property } from './property.js';

const emptyObject = Object.freeze({});

/**
 * Returns an app instance with a state ref that will be stored in `applicationStore.current[id]`
 *
 * @example
 * ```ts
 * const app = application({
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
export function application<Configuration extends ApplicationState['configuration']>(
  properties: {
    /**
     * Application id
     */
    id: Application['id'];

    /**
     * Target store where application will be registered
     */
    target?: Ref<Record<string, ApplicationState>>;
  } & Configuration
): Application<Omit<Configuration, 'id' | 'target'>> {
  const { id, target, ...initialConfiguration } = properties;
  const initialState: ApplicationState = Object.freeze({
    configuration: initialConfiguration,
    state: emptyObject,
  });
  const store: Ref<ApplicationState> =
    target == null ? useRef(`application/${id}`, initialState) : property(target, id, initialState);
  return {
    id,
    initialConfiguration,
    get current() {
      return store.current.state;
    },
    set current(state) {
      store.current = {
        configuration: store.current.configuration,
        state,
      };
    },
  };
}
