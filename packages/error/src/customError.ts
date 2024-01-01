function __captureStackTrace(target: Error) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { captureStackTrace } = Error;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (captureStackTrace != null) {
    captureStackTrace(target, target.constructor);
  }
}

function __setProperty<T, K extends keyof T>(obj: T, property: K, value: T[K]) {
  Object.defineProperty(obj, property, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

export type CustomErrorParameters<T> = Omit<T, 'name' | 'stack' | 'message' | 'cause'> & {
  message?: string;
  cause?: unknown;
};

export class CustomError<Properties> extends globalThis.Error {
  override name = 'CustomError';

  constructor(properties: CustomErrorParameters<Properties>) {
    super('');
    __setProperty(this, 'name', this.name);

    for (const [property, value] of Object.entries(properties)) {
      // @ts-ignore Set using descriptor
      __setProperty(this, property, value);
    }

    // fix the extended error prototype chain
    // because typescript __extends implementation can't
    // see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, new.target.prototype);
    // Build stack trace
    __captureStackTrace(this);
  }
}
