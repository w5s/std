import { __withResolvers as __withResolversDefault } from './__withResolver.compat.js';

export const __withResolvers: typeof Promise.withResolvers =
  Promise.withResolvers == null ? __withResolversDefault : Promise.withResolvers.bind(Promise);
