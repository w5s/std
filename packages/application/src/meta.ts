export const meta = Object.freeze({
  // @ts-ignore - these variables are injected at build time
  name: (typeof __PACKAGE_NAME__ === 'undefined' ? '' : __PACKAGE_NAME__) as string,
  // @ts-ignore - these variables are injected at build time
  version: (typeof __PACKAGE_VERSION__ === 'undefined' ? '' : __PACKAGE_VERSION__) as string,
});

export interface Meta {
  readonly name: string;
}
