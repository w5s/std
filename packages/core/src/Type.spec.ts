import { describe, expect, it } from 'vitest';
import { Type } from './Type.js';
import { define } from './Type/define.js';
import { String } from './String.js';
import { Number } from './Number.js';
import { Boolean } from './Boolean.js';
import { BigInt } from './BigInt.js';
import { Int } from './Int.js';
import { array, dateISO, object, option } from './Codec.js';
import { Tag } from './Tag.js';
import { Option } from './Option.js';
import { assertType } from './testing.js';

describe('Type', () => {
  it('is an alias to functions', () => {
    expect(Type).toEqual({
      define,
      BigInt,
      Boolean,
      Int,
      Number,
      String,
    });
  });

  (() => {
    const Group = object({
      name: Type.String,
    });
    interface Group extends Codec.TypeOf<typeof Group> {}

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
      description: option(Type.String),
      age: Type.Int,
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
        description: Option<string>;
        age: Int;
        groups: ReadonlyArray<Group>;
        created: Date;
        updated: Date;
      }
    >(true);
  })();
});
