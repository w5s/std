/**
 * The context of an app. This represents a container of all providers
 */
export interface AppContext {
  readonly [key: symbol]: (appContext: AppContext) => unknown;
}
