import { describe, expect, it } from 'vitest';

import { withTask } from '../Testing.js';
import { ignore } from './ignore.js';
import { resolve } from './resolve.js';

describe(ignore, () => {
  const expectTask = withTask(expect);

  it('ignores value of task', () => {
    const someTask = resolve('foo');
    expectTask(ignore(someTask)).toResolveSync(undefined);
  });
});
