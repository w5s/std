/* eslint-disable import/no-default-export */
/* eslint-disable no-console */
import { Result } from '@w5s/core';
import { ReferenceError } from '@w5s/error';
import { Initializer } from '../../initializer/index.js';
import type { AppContext } from '../AppContext.js';

export default Initializer('init2', async (_: AppContext) => {
  console.log('init2');
  return Result.Error(new ReferenceError('init2 error'));
});
