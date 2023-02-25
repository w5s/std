import type { Ref } from '@w5s/core';
import { useRef } from './globalStorage.js';
import type { Application, ApplicationId, ApplicationState } from './data.js';
import { property } from './property.js';

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
  properties: application.Option & Configuration
): Application<Omit<Configuration, keyof application.Option>> {
  const { id, target, ...initialConfiguration } = properties;
  const initialState: ApplicationState = Object.freeze({
    configuration: initialConfiguration,
  });

  return Object.assign(
    target == null ? useRef(`application/${id}`, initialState) : property(target, id, initialState),
    {
      id: id as ApplicationId,
      initialConfiguration,
    }
  );
}
export namespace application {
  export type Option = {
    /**
     * Application id
     */
    id: string;

    /**
     * Target store where application will be registered
     */
    target?: Ref<Record<string, ApplicationState>>;
  };
}
