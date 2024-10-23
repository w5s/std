import { assertType } from './assertType.js';
import type { ValueOf } from './ValueOf.js';

type GivenObject = { Foo: boolean; Bar: 'bar'; Baz: 'baz' };

assertType<ValueOf<GivenObject>, 'bar' | 'baz' | boolean>(true);
assertType<ValueOf<GivenObject, 'Baz' | 'Bar'>, 'bar' | 'baz'>(true);
