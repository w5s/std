import { resume } from './Fiber/resume.js';
import { run } from './Fiber/run.js';
import { suspend } from './Fiber/suspend.js';
import { terminate } from './Fiber/terminate.js';

/**
 * @namespace
 */
export const Fiber = {
  resume,
  run,
  suspend,
  terminate,
};
