export interface AppContext {
  readonly [key: symbol]: (appContext: AppContext) => unknown;
}
