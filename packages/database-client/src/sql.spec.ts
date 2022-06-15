import { describe, test, expect } from '@jest/globals';
import { sql, SQLStatement } from './sql.js';

describe(SQLStatement, () => {
  test('should empty statement', () => {
    expect(SQLStatement({})).toEqual({
      _type: 'SQLStatement',
      strings: [''],
      values: [],
    });
  });
  test('should return new SQLStatement struct', () => {
    expect(
      SQLStatement({
        strings: ['foo', 'bar'],
        values: [123],
      })
    ).toEqual({
      _type: 'SQLStatement',
      strings: ['foo', 'bar'],
      values: [123],
    });
  });
  test('should append empty strings until values.length=1', () => {
    expect(
      SQLStatement({
        strings: ['foo'],
        values: [123, 345],
      })
    ).toEqual({
      _type: 'SQLStatement',
      strings: ['foo', '', ''],
      values: [123, 345],
    });
  });

  describe(SQLStatement.concat, () => {
    test('should concat two values', () => {
      expect(
        SQLStatement.concat(
          SQLStatement({
            strings: ['SELECT * FROM toto WHERE'],
          }),
          SQLStatement({
            strings: [' foo=', ''],
            values: ['fooVal'],
          }),
          SQLStatement({
            strings: [' AND bar=', ' AND baz=', ''],
            values: ['barVal', 'bazVal'],
          })
        )
      ).toEqual(
        SQLStatement({
          strings: ['SELECT * FROM toto WHERE foo=', ' AND bar=', ' AND baz='],
          values: ['fooVal', 'barVal', 'bazVal'],
        })
      );
    });
  });

  describe(SQLStatement.format, () => {
    test('should return a formatted string', () =>
      expect(
        SQLStatement.format(sql`SELECT ${'foo'}`, {
          formatString: (str) => `_:${str}`,
          formatValue: (value, index) => `$${index}=${value}`,
        })
      ).toEqual('_:SELECT $1=foo_:'));
  });

  describe(sql, () => {
    test('should return empty string', () => {
      expect(sql``).toEqual(
        SQLStatement({
          strings: [''],
        })
      );
    });
    test('should return interpolated string', () => {
      expect(sql`SELECT * FROM foo`).toEqual(
        SQLStatement({
          strings: ['SELECT * FROM foo'],
        })
      );
    });
    test('should add values', () => {
      expect(sql`SELECT * FROM foo ${'bar'} ${'baz'}`).toEqual(
        SQLStatement({
          strings: ['SELECT * FROM foo ', ' ', ''],
          values: ['bar', 'baz'],
        })
      );
    });
    test('should concat nested statements', () => {
      expect(sql`SELECT * FROM ${sql`foo WHERE ${'bar'}`} ${'baz'}`).toEqual(
        SQLStatement({
          strings: ['SELECT * FROM foo WHERE ', ' ', ''],
          values: ['bar', 'baz'],
        })
      );
    });

    describe(sql.raw, () => {
      test('should return statement', () => {
        expect(sql.raw('foo')).toEqual(
          SQLStatement({
            strings: ['foo'],
            values: [],
          })
        );
      });
    });
  });
});
