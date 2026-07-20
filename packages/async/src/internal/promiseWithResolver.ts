export const promiseWithResolvers: typeof Promise.withResolvers =
  Promise.withResolvers == null
    ? () => {
        const deferred: any = {};

        deferred.promise = new Promise((resolve, reject) => {
          deferred.resolve = resolve;
          deferred.reject = reject;
        });

        return deferred;
      }
    : Promise.withResolvers.bind(Promise);
