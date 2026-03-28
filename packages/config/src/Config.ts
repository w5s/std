import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import type { Option } from '@w5s/core';
import { Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { FileSystem, FilePath, Process } from '@w5s/system';
import type { FileError } from '@w5s/system';
import { ConfigError, ConfigErrorType } from './ConfigError.js';

export interface ConfigExplorer<ConfigValue> {
  /**
   * Search for a configuration file starting from a directory
   */
  search(searchFrom?: FilePath): Task<Option<Config.Result<ConfigValue>>, Config.Error>;

  /**
   * Load a configuration file from an exact path
   */
  load(filepath: FilePath): Task<Config.Result<ConfigValue>, Config.Error>;

  /**
   * Clears both search and load caches
   */
  clearCache(): Task<void, never>;
}

function createConfigExplorer<ConfigValue>(
  moduleName: string,
  options: Config.Options<ConfigValue> = {},
): ConfigExplorer<ConfigValue> {
  const {
    searchPlaces = defaultSearchPlaces(moduleName),
    packageProp = moduleName,
    stopDir,
    cache = true,
    transform,
    loaders,
  } = options;

  const resolvedLoaders: Record<Config.LoaderKey, Config.Loader<ConfigValue>> = { ...defaultLoaders<ConfigValue>(packageProp), ...loaders };

  const loadCache = new Map<string, Promise<Result<Config.Result<ConfigValue>, Config.Error>>>();
  const searchCache = new Map<string, Promise<Result<Option<Config.Result<ConfigValue>>, Config.Error>>>();

  function clearCache(): Task<void, never> {
    return Task.create(() => {
      loadCache.clear();
      searchCache.clear();
      return Task.ok();
    });
  }

  function cached<V, E>(task: Task<V, E>, cacheOptions: {
    key: string;
    cache: Map<string, Promise<Result<V, E>>>;
    enabled: boolean;
  }): Task<V, E> {
    const { key, cache: cacheMap, enabled } = cacheOptions;
    return enabled
      ? Task.create(async ({ run }) => {
          let returnValue = cacheMap.get(key);
          if (returnValue == null) {
            returnValue = Promise.resolve(run(task));
            cacheMap.set(key, returnValue);
          }
          return returnValue;
        })
      : task;
  }

  function load(filepath: FilePath): Task<Config.Result<ConfigValue>, Config.Error> {
    return cached(loadDefault(filepath), {
      key: filepath,
      cache: loadCache,
      enabled: cache,
    });
  }

  function loadDefault(filepath: FilePath): Task<Config.Result<ConfigValue>, Config.Error> {
    return Task.create(async ({ run }) => {
      const loaded = await run(loadFromFile(filepath, true));
      if (!loaded.ok) return loaded;
      if (loaded.value == null) {
        return Task.error(
          new ConfigError({
            configErrorType: ConfigErrorType.NotFound,
            filepath,
            cause: undefined,
            message: 'No configuration found in file',
          }),
        );
      }
      return Task.ok(loaded.value);
    });
  }

  function search(searchFrom?: FilePath): Task<Option<Config.Result<ConfigValue>>, Config.Error> {
    return Task.andThen(resolveStartDirectory(searchFrom), (startDirectory) => cached(searchDefault(startDirectory), {
      key: startDirectory,
      cache: searchCache,
      enabled: cache,
    }));
  }

  function searchDefault(startDirectory: FilePath): Task<Option<Config.Result<ConfigValue>>, Config.Error> {
    return Task.create(async ({ run }) => {
      const stopDirectory = stopDir == null ? undefined : FilePath.normalize(stopDir);
      let currentDirectory = FilePath.normalize(startDirectory);

      while (true) {
        for (const searchPlace of searchPlaces) {
          const candidatePath = FilePath.concat([currentDirectory, searchPlace]);
          const candidateResult = await run(loadIfExists(candidatePath));
          if (Result.isError(candidateResult)) {
            return candidateResult;
          }
          if (candidateResult.value != null) {
            return Task.ok(candidateResult.value);
          }
        }

        if (stopDirectory != null && currentDirectory === stopDirectory) {
          break;
        }

        const parentDirectory = FilePath.dirname(currentDirectory);
        if (parentDirectory === currentDirectory) {
          break;
        }
        currentDirectory = parentDirectory;
      }

      return Task.ok(undefined);
    });
  }

  function resolveStartDirectory(searchFrom?: FilePath) {
    return Task.create(async ({ run }) => {
      const cwd = await run(Process.getCurrentDirectory());
      if (!cwd.ok) return cwd;

      const basePath = FilePath.normalize(searchFrom ?? cwd.value);
      const statusResult = await run(FileSystem.readFileStatus(basePath));
      if (!statusResult.ok) return Task.ok(FilePath.dirname(basePath));

      const status = statusResult.value;
      return Task.ok(status.isDirectory ? basePath : FilePath.dirname(basePath));
    });
  }

  function loadIfExists(filepath: FilePath): Task<Option<Config.Result<ConfigValue>>, Config.Error> {
    return Task.create(async ({ run }) => {
      const statusResult = await run(FileSystem.readFileStatus(filepath));
      if (Result.isError(statusResult)) {
        if (isNotFoundError(statusResult.error)) {
          return Task.ok(undefined);
        }
        return Task.error(
          new ConfigError({
            configErrorType: ConfigErrorType.ReadError,
            filepath,
            cause: statusResult.error,
            message: 'Failed to read config file status',
          }),
        );
      }

      const status = statusResult.value;
      if (!status.isFile) {
        return Task.ok(undefined);
      }

      const loaded = await run(loadFromFile(filepath, false));
      if (Result.isError(loaded)) {
        if (loaded.error.configErrorType === ConfigErrorType.NotFound) {
          return Task.ok(undefined);
        }
        return loaded;
      }

      return Task.ok(loaded.value);
    });
  }

  function loadFromFile(
    filepath: FilePath,
    strict: boolean,
  ): Task<Option<Config.Result<ConfigValue>>, Config.Error> {
    return Task.create(async ({ run }) => {
      const loaderKey = getLoaderKey(filepath);
      if (loaderKey == null) {
        return Task.error(
          new ConfigError({
            configErrorType: ConfigErrorType.LoadError,
            filepath,
            cause: undefined,
            message: 'No loader available for file',
          }),
        );
      }

      const loader = resolvedLoaders[loaderKey];
      if (loader == null) {
        return Task.error(
          new ConfigError({
            configErrorType: ConfigErrorType.LoadError,
            filepath,
            cause: undefined,
            message: 'No loader configured for file',
          }),
        );
      }

      const contentResult = await run(FileSystem.readFile(filepath, { encoding: 'utf8' }));
      if (Result.isError(contentResult)) {
        if (isNotFoundError(contentResult.error)) {
          return Task.error(
            new ConfigError({
              configErrorType: ConfigErrorType.NotFound,
              filepath,
              cause: contentResult.error,
              message: 'Config file not found',
            }),
          );
        }
        return Task.error(
          new ConfigError({
            configErrorType: ConfigErrorType.ReadError,
            filepath,
            cause: contentResult.error,
            message: 'Failed to read config file',
          }),
        );
      }

      const content = contentResult.value as string;
      const loaderResult = await run(loader(filepath, content));
      if (Result.isError(loaderResult)) return loaderResult;

      const loaded = loaderResult.value;
      if (loaded == null) {
        if (strict) {
          return Task.error(
            new ConfigError({
              configErrorType: ConfigErrorType.NotFound,
              filepath,
              cause: undefined,
              message: 'No configuration found in file',
            }),
          );
        }
        return Task.ok(undefined);
      }

      const transformed = transform == null ? loaded : transform(loaded);
      if (transformed == null) {
        if (strict) {
          return Task.error(
            new ConfigError({
              configErrorType: ConfigErrorType.NotFound,
              filepath,
              cause: undefined,
              message: 'Config transform returned empty value',
            }),
          );
        }
        return Task.ok(undefined);
      }

      return Task.ok(transformed);
    });
  }

  return {
    search,
    load,
    clearCache,
  };
}

function defaultSearchPlaces(moduleName: string): Config.SearchPlaces {
  return [
    'package.json',
    `.${moduleName}rc`,
    `.${moduleName}rc.json`,
    `.${moduleName}rc.js`,
    `.${moduleName}rc.cjs`,
    `.${moduleName}rc.mjs`,
    `${moduleName}.config.js`,
    `${moduleName}.config.cjs`,
    `${moduleName}.config.mjs`,
  ];
}
function defaultLoaders<ConfigValue>(packageProp: string): Record<Config.LoaderKey, Config.Loader<ConfigValue>> {
  return {
    'package.json': createPackageJSONLoader(packageProp),
    '.json': loadJSON,
    '.js': loadJSModule,
    '.cjs': loadCJSModule,
    '.mjs': loadMJSModule,
    'noExt': loadJSON,
  };
}

/**
 * Cosmiconfig-like configuration explorer
 *
 * @namespace
 */
export const Config = Object.assign(createConfigExplorer, {
  defaultSearchPlaces,
  defaultLoaders,
});

export namespace Config {
  export type SearchPlaces = ReadonlyArray<string>;

  export type LoaderKey = 'package.json' | 'noExt' | '.json' | '.js' | '.cjs' | '.mjs';

  export type Loader<ConfigValue> = (
    filepath: FilePath,
    content: string,
  ) => Task<Option<Config.Result<ConfigValue>>, Config.Error>;

  export interface Options<ConfigValue> {
    /**
     * List of filenames to search for
     */
    readonly searchPlaces?: SearchPlaces;

    /**
     * Property to read in package.json
     */
    readonly packageProp?: string;

    /**
     * Directory to stop searching at
     */
    readonly stopDir?: FilePath;

    /**
     * Enable or disable caching
     */
    readonly cache?: boolean;

    /**
     * Transform function applied to loaded config
     */
    readonly transform?: (result: Config.Result<ConfigValue>) => Option<Config.Result<ConfigValue>>;

    /**
     * Custom loaders by file extension
     */
    readonly loaders?: Partial<Record<LoaderKey, Loader<ConfigValue>>>;
  }

  export interface Result<ConfigValue> {
    /**
     * Parsed configuration
     */
    readonly config: ConfigValue;

    /**
     * File path of the configuration file
     */
    readonly filepath: FilePath;

    /**
     * True if the configuration file is empty
     */
    readonly isEmpty?: true;
  }

  export type Error = ConfigError;
}

function getLoaderKey(filepath: FilePath): Config.LoaderKey | undefined {
  const basename = FilePath.basename(filepath);
  if (basename === 'package.json') {
    return 'package.json';
  }

  const extension = FilePath.extname(filepath);
  if (extension === '') {
    return 'noExt';
  }

  if (extension === '.json' || extension === '.js' || extension === '.cjs' || extension === '.mjs') {
    return extension as Config.LoaderKey;
  }

  return undefined;
}

function isNotFoundError(error: FileError): boolean {
  return error.code === 'ENOENT';
}

function loadJSON<ConfigValue>(filepath: FilePath, content: string): Task<Option<Config.Result<ConfigValue>>, Config.Error> {
  return Task.create(() => {
    const trimmed = content.trim();
    if (trimmed.length === 0) {
      return Task.ok({
        config: undefined as ConfigValue,
        filepath,
        isEmpty: true,
      });
    }

    try {
      const parsed = JSON.parse(content) as ConfigValue;
      return Task.ok({ config: parsed, filepath });
    } catch (error: unknown) {
      return Task.error(
        new ConfigError({
          configErrorType: ConfigErrorType.ParseError,
          filepath,
          cause: error,
          message: 'Invalid JSON configuration',
        }),
      );
    }
  });
}

function createPackageJSONLoader<ConfigValue>(
  packageProp: string,
): (filepath: FilePath, content: string) => Task<Option<Config.Result<ConfigValue>>, Config.Error> {
  return (filepath: FilePath, content: string) =>
    Task.from(({ resolve, reject }) => {
      const trimmed = content.trim();
      if (trimmed.length === 0) {
        resolve({
          config: undefined as ConfigValue,
          filepath,
          isEmpty: true,
        });
        return;
      }

      try {
        const parsed = JSON.parse(content) as Record<string, unknown>;
        if (!(packageProp in parsed)) {
          resolve(undefined);
          return;
        }
        resolve({ config: parsed[packageProp] as ConfigValue, filepath });
      } catch (error: unknown) {
        reject(
          new ConfigError({
            configErrorType: ConfigErrorType.ParseError,
            filepath,
            cause: error,
            message: 'Invalid package.json',
          }),
        );
      }
    });
}

function loadJSModule<ConfigValue>(filepath: FilePath): Task<Option<Config.Result<ConfigValue>>, Config.Error> {
  return Task.tryCall(async () => {
    const mod = await import(pathToFileURL(filepath).href);
    const config = (mod as { default?: ConfigValue }).default ?? (mod as ConfigValue);
    return ({ config, filepath });
  }, (error) =>
    new ConfigError({
      configErrorType: ConfigErrorType.LoadError,
      filepath,
      cause: error,
      message: 'Failed to load JS module',
    }),
  );
}

function loadMJSModule<ConfigValue>(filepath: FilePath): Task<Option<Config.Result<ConfigValue>>, Config.Error> {
  return loadJSModule(filepath);
}

function loadCJSModule<ConfigValue>(filepath: FilePath): Task<Option<Config.Result<ConfigValue>>, Config.Error> {
  return Task.tryCall(() => {
    const require = createRequire(import.meta.url);
    const mod = require(filepath) as ({ default: ConfigValue } | ConfigValue);
    const config = typeof mod === 'object' && mod != null && ('default' in mod) ? mod.default : mod;
    return ({ config, filepath });
  }, (error) =>
    new ConfigError({
      configErrorType: ConfigErrorType.LoadError,
      filepath,
      cause: error,
      message: 'Failed to load CJS module',
    }),
  );
}
