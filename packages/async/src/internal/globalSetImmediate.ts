/* eslint-disable ts/no-unsafe-call */
/* eslint-disable ts/no-unsafe-member-access */
export const globalSetImmediate =
  (globalThis as any).setImmediate == null
    ? (fn: () => void) => setTimeout(fn, 0)
    : (fn: () => void) => Number((globalThis as any).setImmediate(fn));
