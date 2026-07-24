import type { Tag } from './Tag.js';

import { assertType } from './assertType.js';

assertType<Tag<'Foo'>, Tag<'Bar'>>(false);
assertType<number & Tag<'Foo'>, number>(false);
