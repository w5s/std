/* eslint-disable @typescript-eslint/consistent-type-assertions */
import * as nodeFS from 'node:fs';
import * as nodeProcess from 'node:process';

export const Internal = {
  FS: { ...nodeFS.promises } as typeof nodeFS.promises,
  Process: { ...nodeProcess },
};
