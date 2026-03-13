import { useConfiguration } from '@w5s/application';
import { meta } from './meta.js';

/**
 * Database Application reference
 */
export const configuration = useConfiguration(meta, {});
