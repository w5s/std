import type { Not } from '../Not.js';

export const BooleanNot: Not<boolean> = {
  not(self) {
    return !self;
  },
};
