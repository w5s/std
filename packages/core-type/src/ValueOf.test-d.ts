import type { ValueOf } from './ValueOf.js';

import { assertType } from './assertType.js';

interface GivenObject { Bar: 'bar'; Baz: 'baz'; Foo: boolean }

assertType<ValueOf<GivenObject>, 'bar' | 'baz' | boolean>(true);
assertType<ValueOf<GivenObject, 'Bar' | 'Baz'>, 'bar' | 'baz'>(true);
