import { assertType } from './assertType.js';
import type { Tag } from './Tag.js';

assertType<Tag<'Foo'>, Tag<'Bar'>>(false);
assertType<number & Tag<'Foo'>, number>(false);
