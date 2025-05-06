/* eslint-disable import/no-default-export */
/* eslint-disable no-console */
import { Result } from '@w5s/core';
import { Initializer } from '../../initializer/Initializer.js';
import type { AppContext } from '../AppContext.js';

export default Initializer('init1', async (_: AppContext) => {
  console.log('init1');
  return Result.Ok();
});
