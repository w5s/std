import type { AppContext } from '../AppContext.js';

import { Initializer } from '../../initializer/index.js';

export default Initializer(import.meta.url, async (_: AppContext) => {
  console.log('init1');
});
