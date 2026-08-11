export const promiseWithResolvers: typeof Promise.withResolvers =
  Promise.withResolvers == null
    ? () => {
        const deferred: any = {};

        // eslint-disable-next-line ts/no-unsafe-member-access
        deferred.promise = new Promise((resolve, reject) => {
          // eslint-disable-next-line ts/no-unsafe-member-access
          deferred.resolve = resolve;
          // eslint-disable-next-line ts/no-unsafe-member-access
          deferred.reject = reject;
        });

        // eslint-disable-next-line ts/no-unsafe-return
        return deferred;
      }
    : Promise.withResolvers.bind(Promise);
