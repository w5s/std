export const globalClearImmediate: (id: any) => void =
  (globalThis as any).clearImmediate == null
    ? (id: any) => clearTimeout(id)
    : (id: any) => Number((globalThis as any).clearImmediate(id));
