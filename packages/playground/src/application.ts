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
   * Symbol for application state property
   *
   * @example
   * ```ts
   * globalThis[state]; // application state
   * ```
   */
  export const state = Symbol('Application.state');

  enum ApplicationStatus {
    NotStarted,
    Starting,
    Started,
  }

  interface ApplicationState<Configuration = unknown> {
    readonly instance: Application<Configuration>;
    readonly configuration: AnyConfiguration;
    readonly configurationPatch: Partial<AnyConfiguration> | undefined;
    readonly status: ApplicationStatus;
    readonly started: Promise<void>;
  }

  /**
   * Application state type
   */
  interface State {
    readonly application: Record<Id, Ref<ApplicationState<unknown>>>;
  }

  function MakeState(globalObject: Record<string | number | symbol, unknown>) {
    const globalState: State =
      (globalObject[state] as State | undefined) ??
      (globalObject[state] = Object.freeze({
        application: {},
      }));

    function getState(applicationId: Id) {
      return globalState.application[applicationId];
    }

    function updateState(
      applicationId: Id,
      mapFn: (state: ApplicationState) => ApplicationState,
      onUpdate?: (previousState: ApplicationState, nextState: ApplicationState) => void
    ) {
      const applicationStateRef = getState(applicationId);
      if (applicationStateRef != null) {
        const currentValue = applicationStateRef.current;
        const nextValue = mapFn(currentValue);
        if (currentValue !== nextValue) {
          applicationStateRef.current = nextValue;
          if (onUpdate != null) {
            onUpdate(currentValue, nextValue);
          }
        }
      }
    }

    function configurationRead(applicationId: Id, key: string, defaultValue: Option<unknown>) {
      const applicationState = globalState.application[applicationId]?.current;
      if (applicationState != null && key in applicationState.configuration) {
        return applicationState.configuration[key];
      }
      return defaultValue;
    }

    function configurationWrite(applicationId: Id, key: string, value: unknown) {
      updateState(
        applicationId,
        (currentState) => ({
          ...currentState,
          configurationPatch: {
            ...currentState.configurationPatch,
            [key]: value,
          },
        }),
        ({ configurationPatch }) => {
          if (configurationPatch == null) {
            queueMicrotask(commit);
          }
        }
      );
      function commit() {
        updateState(
          applicationId,
          (currentState) =>
            currentState.configurationPatch == null
              ? currentState
              : {
                  ...currentState,
                  configuration: {
                    ...currentState.configuration,
                    ...currentState.configurationPatch,
                  },
                  configurationPatch: undefined,
                },
          didChange
        );
      }
      function didChange(
        { instance, configuration: previous }: ApplicationState,
        { configuration: next }: ApplicationState
      ) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Task.unsafeRun(instance.applicationDidChange(previous, next));
      }
    }

    function getStatus(applicationId: Id): ApplicationStatus {
      return globalState.application[applicationId]?.current.status ?? ApplicationStatus.NotStarted;
    }
    function setStatus(applicationId: Id, status: ApplicationStatus, started?: Promise<void>) {
      updateState(applicationId, (currentState) => ({
        ...currentState,
        status,
        started: started ?? currentState.started,
      }));
    }
    function register(instance: Application<any>): void {
      const { applicationId } = instance;
      const applicationRef = globalState.application[applicationId];
      if (applicationRef == null) {
        globalState.application[applicationId] = {
          current: {
            instance,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            configuration: instance.applicationDefault,
            configurationPatch: undefined,
            status: ApplicationStatus.NotStarted,
            started: Promise.resolve(),
          },
        };
      } else if (applicationRef.current.instance !== instance) {
        applicationRef.current = {
          ...applicationRef.current,
          instance,
        };
      }
    }
    return {
      getState,
      configurationRead,
      configurationWrite,
      getStatus,
      setStatus,
      register,
    };
  }

  const State = MakeState(globalThis);

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

  /**
   * Start `app`
   *
   * @example
   * const app: Application<State> = ...;
   * const task = Application.start(app);
   * await Task.unsafeRun(task);
   * ```
   * @param app - the application object
   */
  export function start<State>(app: Application<State>): Task<void, StartError> {
    const { applicationId, applicationStart } = app;
    State.register(app);
    return {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      taskRun(resolveTask, rejectTask, cancelerRef) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        queueMicrotask(async () => {
          const status = State.getStatus(applicationId);
          switch (status) {
            case ApplicationStatus.NotStarted: {
              const startTask = applicationStart();
              const started = new Promise<void>((resolve, reject) => {
                try {
                  startTask.taskRun(
                    (value) => {
                      State.setStatus(applicationId, ApplicationStatus.Started);
                      resolveTask(value);
                      resolve();
                    },
                    (error) => {
                      rejectTask(error);
                      resolve();
                    },
                    cancelerRef
                  );
                } catch (error: unknown) {
                  reject(error);
                }
              });
              State.setStatus(applicationId, ApplicationStatus.Starting, started);

              return started;
            }
            case ApplicationStatus.Starting: {
              await State.getState(applicationId)?.current.started;
              return resolveTask();
            }
            case ApplicationStatus.Started: {
              return resolveTask();
            }
            default: {
              throw new ReferenceError('NeverError');
            }
          }
        });
      },
    };
  }
}
