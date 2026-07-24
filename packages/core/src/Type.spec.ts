import { assertType } from '@w5s/core-type';
import { describe, expect, it } from 'vitest';

import type { Int as TInt } from './Int.js';
import type { Option as TOption } from './Option.js';

import { Codec } from './Codec.js';
import { Enum } from './Enum.js';
import { Tag } from './Tag.js';
import { Type } from './Type.js';
import { Array } from './Type/Array.js';
import { bigint } from './Type/bigint.js';
import { boolean } from './Type/boolean.js';
import { Char } from './Type/Char.js';
import { constant } from './Type/constant.js';
import { define } from './Type/define.js';
import { ensure } from './Type/ensure.js';
import { Int } from './Type/Int.js';
import { number } from './Type/number.js';
import { TObject } from './Type/Object.js';
import { Option } from './Type/Option.js';
import { Ordering } from './Type/Ordering.js';
import { Record } from './Type/Record.js';
import { RegExp } from './Type/RegExp.js';
import { string } from './Type/string.js';
import { Tuple } from './Type/Tuple.js';
import { union } from './Type/union.js';
import { unknown } from './Type/unknown.js';
import { URL } from './Type/URL.js';
import { UUID } from './Type/UUID.js';

describe('Type', () => {
  it('is an alias to functions', () => {
    expect(Type).toEqual({
      Array,
      bigint,
      boolean,
      Char,
      constant,
      define,
      ensure,
      Int,
      number,
      Object: TObject,
      Option,
      Ordering,
      Record,
      RegExp,
      string,
      Tuple,
      union,
      unknown,
      URL,
      UUID,
    });
  });

  {
    const Group = Type.Object({
      name: Type.string,
    });
    interface Group extends Codec.TypeOf<typeof Group> {}

    const Gender = Enum.define({
      Female: 'female',
      Male: 'male',
    });

    type PersonId = string & Tag<'PersonId'>;
    const PersonId = Tag.define<string, PersonId>({
      hasInstance(anyValue) {
        return typeof anyValue === 'string';
      },
      typeName: 'PersonId',
    });

    const Person = Type.Object({
      age: Type.Int,
      description: Type.Option(Type.string),
      gender: Gender,
      groups: Type.Array(Group),
      id: PersonId,
      name: Type.string,
      // created: dateISO,
      // updated: dateISO,
    });
    interface Person extends Codec.TypeOf<typeof Person> {}

    assertType<
      Person,
      {
        age: TInt;
        description: TOption<string>;
        gender: 'female' | 'male';
        groups: ReadonlyArray<Group>;
        id: PersonId;
        name: string;
        // created: Date;
        // updated: Date;
      }
    >(true);
  }
});
