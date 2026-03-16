export const __withResolvers: typeof Promise.withResolvers = () => {
  const deferred: any = {};

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;

    deferred.reject = reject;
  });

  return deferred;
};
