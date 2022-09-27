import { Task, Ref, Option } from '@w5s/core';

type AnyConfiguration = Record<string, unknown>;
const resolveVoid = Task.resolve();
const returnResolveVoid = () => resolveVoid;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, promise/prefer-await-to-then, promise/no-callback-in-promise
const queueMicrotask = globalThis.queueMicrotask ?? ((callback) => Promise.resolve().then(callback));

export interface Application<Configuration> {
  /**
   * Application unique identifier
   */
  readonly applicationId: Application.Id;
  /**
   * Task that will be run when started
   */
  readonly applicationStart: () => Task<void, Application.StartError>;
  /**
   * Default application configuration
   */
  readonly applicationDefault: Configuration;
  /**
   * Callback after configuration change
   */
  readonly applicationDidChange: (previous: Configuration, next: Configuration) => Task<void, never>;
}

/**
 * Application constructor
 *
 * @example
 * ```ts
 * const app = Application({
 *   applicationId: 'my-app',
 *   applicationDefault: { foo: true },
 *   applicationStart: () => Console.log(Application.get(app, 'foo')),
 *   applicationDidChange: (previous, next) => Console.log(previous.foo, '=>', next.foo)),
 * });
 * ```
 * @category Constructor
 * @param properties - The application properties
 */
export function Application<Configuration extends AnyConfiguration>(properties: {
  applicationId: Application.Id;
  applicationStart?: () => Task<void, Application.StartError>;
  applicationDefault: Configuration;
  applicationDidChange?: (previous: Configuration, next: Configuration) => Task<void, never>;
}): Application<Configuration> {
  return {
    applicationId: properties.applicationId,
    applicationStart: properties.applicationStart ?? returnResolveVoid,
    applicationDefault: properties.applicationDefault,
    applicationDidChange: properties.applicationDidChange ?? returnResolveVoid,
  };
}
export namespace Application {
  export type Id = string;

  export type StartError = unknown;

  /**
   * Internal functions namespace
   */
  export namespace Internal {
    /**
     * Symbol for application state property
     *
     * @example
     * ```ts
     * globalThis[state]; // application state
     * ```
     */
    export const state = Symbol('Application.state');

    /**
     * Application state type
     */
    export interface State {
      readonly application: Record<Id, Application<unknown>>;
      readonly status: Record<Id, boolean>;
      readonly configuration: Record<Id, AnyConfiguration>;
      readonly configurationNext: Option<Record<Id, AnyConfiguration>>;
    }

    /**
     * Default application state value
     */
    export const defaultState: State = Object.freeze({
      application: {},
      status: {},
      configuration: {},
      configurationNext: undefined,
    });

    /**
     * Return a new {@link @w5s/core!Ref} from `globalObject`
     *
     * @example
     * ```ts
     * const stateRef = ref(globalThis);
     * ```
     */
    export function ref(globalObject: Record<string | number | symbol, unknown>): Ref<State> {
      return {
        get current() {
          // @ts-ignore globalThis[state] is not declared
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, no-return-assign
          return globalObject[state] ?? defaultState;
        },
        set current(value: State) {
          // @ts-ignore globalThis[state] is not declared
          globalObject[state] = value;
        },
      };
    }

    export function MakeState(stateRef: Ref<State>) {
      function update(mapFn: (state: State) => State, onUpdate?: (previousState: State, nextState: State) => void) {
        const currentValue = stateRef.current;
        const nextValue = mapFn(currentValue);
        if (currentValue !== nextValue) {
          stateRef.current = nextValue;
          if (onUpdate != null) {
            onUpdate(currentValue, nextValue);
          }
        }
      }

      function configurationRead(applicationId: string, key: string, defaultValue: Option<unknown>) {
        const applicationConfiguration = stateRef.current.configuration[applicationId];
        if (applicationConfiguration != null && key in applicationConfiguration) {
          return applicationConfiguration[key];
        }
        return defaultValue;
      }

      function configurationWrite(applicationId: string, key: string, value: unknown) {
        update((currentState) => {
          const { configurationNext = {}, configuration } = currentState;
          const applicationConfiguration = configurationNext[applicationId] ?? {
            ...configuration[applicationId],
          };
          return {
            ...currentState,
            configurationNext: {
              ...configurationNext,
              [applicationId]: { ...applicationConfiguration, [key]: value },
            },
          };
        }, configurationDidChange);
      }

      function configurationDidChange() {
        queueMicrotask(configurationCommit);
      }

      function configurationCommit() {
        update((currentState) => {
          const { configuration, configurationNext } = currentState;

          return configurationNext != null
            ? {
                ...currentState,
                configuration: {
                  ...configuration,
                  ...configurationNext,
                },
                configurationNext: undefined,
              }
            : currentState;
        }, configurationDidCommit);
      }

      function configurationDidCommit({ application, configuration, configurationNext }: State) {
        if (configurationNext != null) {
          Object.keys(configurationNext).map((applicationId) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const app = application[applicationId]!;
            const previous = configuration[applicationId];
            const next = configurationNext[applicationId];
            return Task.unsafeRun(app.applicationDidChange(previous, next));
          });
        }
      }
      function isStarted(applicationId: string): boolean {
        return stateRef.current.status[applicationId] === true;
      }
      function setStarted(applicationId: string) {
        update((currentState) => ({
          ...currentState,
          status: {
            ...currentState.status,
            [applicationId]: true,
          },
        }));
      }
      function register(instance: Application<any>): void {
        update((currentState) => {
          const { applicationId } = instance;
          const { application } = currentState;

          return application[applicationId] !== instance
            ? {
                ...currentState,
                application: {
                  ...application,
                  [applicationId]: instance,
                },
              }
            : currentState;
        });
      }
      return {
        configurationRead,
        configurationWrite,
        configurationCommit,
        isStarted,
        setStarted,
        register,
      };
    }
  }

  const State = Internal.MakeState(Internal.ref(globalThis));

  /**
   * Application name type
   */
  export type Name = string;

  /**
   * @example
   * ```ts
   * const app = Application({
   *   // ...,
   *   applicationDefault: {
   *     foo: false,
   *   },
   * });
   * Application.set(app, 'foo', true);
   * ```
   * @param app - the application object
   * @param key - the application configuration key
   * @param value - the application configuration value
   */
  export function set<Configuration extends AnyConfiguration, Key extends keyof Configuration & string>(
    app: Application<Configuration>,
    key: Key,
    value: Configuration[Key]
  ): void {
    const { applicationId } = app;
    State.register(app);
    State.configurationWrite(applicationId, key, value);
  }

  /**
   * @example
   * ```ts
   * const app = Application({
   *   // ...,
   *   applicationDefault: {
   *     foo: false,
   *   },
   * });
   * Application.get(app, 'foo');// false
   * ```
   * @param app - the application object
   * @param key - the application configuration key
   */
  export function get<Configuration extends AnyConfiguration, Key extends keyof Configuration & string>(
    app: Application<Configuration>,
    key: Key
  ): Configuration[Key] {
    /* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const { applicationId, applicationDefault } = app;
    return State.configurationRead(applicationId, key, applicationDefault[key]) as Configuration[Key];
  }

  export function start<State>(app: Application<State>): Task<void, StartError> {
    const { applicationId, applicationStart } = app;
    State.register(app);
    return {
      taskRun(resolve, reject, cancelerRef) {
        queueMicrotask(() => {
          if (!State.isStarted(applicationId)) {
            applicationStart().taskRun(
              () => {
                State.setStarted(applicationId);
                resolve(undefined);
              },
              reject,
              cancelerRef
            );
          } else {
            resolve(undefined);
          }
        });
      },
    };
  }
}
