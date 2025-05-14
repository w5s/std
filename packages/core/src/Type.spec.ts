import { describe, expect, it } from 'vitest';
import { assertType } from '@w5s/core-type';
import { Type } from './Type.js';
import { define } from './Type/define.js';
import { Array } from './Type/Array.js';
import { string } from './Type/string.js';
import { number } from './Type/number.js';
import { boolean } from './Type/boolean.js';
import { bigint } from './Type/bigint.js';
import { Int } from './Type/Int.js';
import { Option } from './Type/Option.js';
import { TObject } from './Type/Object.js';
import { Codec } from './Codec.js';
import { Tag } from './Tag.js';
import { Enum } from './Enum.js';
import type { Int as TInt } from './Int.js';
import type { Option as TOption } from './Option.js';
import { ensure } from './Type/ensure.js';
import { union } from './Type/union.js';
import { constant } from './Type/constant.js';
import { Tuple } from './Type/Tuple.js';
import { unknown } from './Type/unknown.js';
import { UUID } from './Type/UUID.js';
import { Record } from './Type/Record.js';
import { URL } from './Type/URL.js';
import { Char } from './Type/Char.js';
import { RegExp } from './Type/RegExp.js';
import { Ordering } from './Type/Ordering.js';

describe('Type', () => {
  it('is an alias to functions', () => {
    expect(Type).toEqual({
      union,
      constant,
      define,
      ensure,
      Array,
      bigint,
      boolean,
      Char,
      Int,
      number,
      unknown,
      string,
      Record,
      Object: TObject,
      Option,
      Ordering,
      Tuple,
      RegExp,
      UUID,
      URL,
    });
  });

  (() => {
    const Group = Type.Object({
      name: Type.string,
    });
    interface Group extends Codec.TypeOf<typeof Group> {}

    const Gender = Enum.define({
      Male: 'male',
      Female: 'female',
    });

    type PersonId = string & Tag<'PersonId'>;
    const PersonId = Tag.define<string, PersonId>({
      typeName: 'PersonId',
      hasInstance(anyValue) {
        return typeof anyValue === 'string';
      },
    });

    const Person = Type.Object({
      id: PersonId,
      name: Type.string,
      description: Type.Option(Type.string),
      age: Type.Int,
      gender: Gender,
      groups: Type.Array(Group),
      // created: dateISO,
      // updated: dateISO,
    });
    interface Person extends Codec.TypeOf<typeof Person> {}

    assertType<
      Person,
      {
        id: PersonId;
        name: string;
        description: TOption<string>;
        age: TInt;
        gender: 'male' | 'female';
        groups: ReadonlyArray<Group>;
        // created: Date;
        // updated: Date;
      }
    >(true);
  })();
});
