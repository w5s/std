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
import { $Object } from './Type/Object.js';
import { Codec } from './Codec.js';
import { Tag } from './Tag.js';
import { Enum } from './Enum.js';
import type { Int as IntType } from './Int.js';
import type { Option as OptionType } from './Option.js';
import { ensure } from './Type/ensure.js';
import { union } from './Type/union.js';
import { constant } from './Type/constant.js';
import { Tuple } from './Type/Tuple.js';
import { unknown } from './Type/unknown.js';
import { UUID } from './UUID.js';

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
      Int,
      number,
      unknown,
      string,
      Object: $Object,
      Option,
      Tuple,
      UUID,
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
        description: OptionType<string>;
        age: IntType;
        gender: 'male' | 'female';
        groups: ReadonlyArray<Group>;
        // created: Date;
        // updated: Date;
      }
    >(true);
  })();
});
