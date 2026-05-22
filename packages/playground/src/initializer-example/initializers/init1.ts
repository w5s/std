import { Initializer } from '../../initializer/index.js';
import type { AppContext } from '../AppContext.js';

export default Initializer(import.meta.url, async (_: AppContext) => {
  console.log('init1');
});
