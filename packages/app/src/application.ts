import { applicationStore } from './applicationStore.js';
import type { Application } from './data.js';
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
export function application(properties: { id: Application['id'] }): Application {
  const { id } = properties;
  const ref = property(applicationStore, id, emptyObject);
  // @ts-ignore we are initializing data
  ref.id = id;
  return ref as Application;
}
