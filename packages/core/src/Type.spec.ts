import { describe, expect, it } from 'vitest';
import { Type } from './Type.js';
import { define } from './Type/define.js';
import { String } from './Type/String.js';
import { Number } from './Type/Number.js';
import { Boolean } from './Type/Boolean.js';
import { BigInt } from './Type/BigInt.js';
import { Int } from './Type/Int.js';
import { Option } from './Type/Option.js';
import { Codec, array, dateISO, object } from './Codec.js';
import { Tag } from './Tag.js';
import { assertType } from './testing.js';
import { Enum } from './Enum.js';
import type { Int as IntType } from './Int.js';
import type { Option as OptionType } from './Option.js';

describe('Type', () => {
  it('is an alias to functions', () => {
    expect(Type).toEqual({
      define,
      BigInt,
      Boolean,
      Int,
      Number,
      String,
      Option,
    });
  });

  (() => {
    const Group = object({
      name: Type.String,
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

    const Person = object({
      id: PersonId,
      name: Type.String,
      description: Type.Option(Type.String),
      age: Type.Int,
      gender: Gender,
      groups: array(Group),
      created: dateISO,
      updated: dateISO,
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
        created: Date;
        updated: Date;
      }
    >(true);
  })();
});
