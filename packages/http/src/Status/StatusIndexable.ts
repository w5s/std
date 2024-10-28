import { lazy } from '@w5s/core/dist/lazy.js';
import { Indexable } from '@w5s/core/dist/Indexable.js';
import * as StatusAll from './status.all.js';
import type { Status } from './Status.js';

const indexByCode = lazy(() => {
  const returnValue = new Map<Status['statusCode'], Status>();
  for (const status of Object.values(StatusAll)) {
    returnValue.set(status.statusCode, status);
  }
  return returnValue;
});

export const StatusIndexable = Indexable({
  at(code) {
    return (
      indexByCode().get(code) ?? {
        statusCode: code,
        statusMessage: '',
      }
    );
  },
  indexOf(status) {
    return status.statusCode;
  },
});
