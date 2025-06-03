import { describe, it, expect } from 'vitest';
import { sql, SQLStatement } from './sql.js';

describe('SQLStatement', () => {
  it('should empty statement', () => {
    expect(SQLStatement({})).toMatchObject({
      _: 'SQLStatement',
      strings: [''],
      values: [],
    });
  });
  it('should return new SQLStatement struct', () => {
    expect(
      SQLStatement({
        strings: ['foo', 'bar'],
        values: [123],
      }),
    ).toMatchObject({
      _: 'SQLStatement',
      strings: ['foo', 'bar'],
      values: [123],
    });
  });
  it('should append empty strings until values.length=1', () => {
    expect(
      SQLStatement({
        strings: ['foo'],
        values: [123, 345],
      }),
    ).toMatchObject({
      _: 'SQLStatement',
      strings: ['foo', '', ''],
      values: [123, 345],
    });
  });

  describe('.concat', () => {
    it('should concat two values', () => {
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
          }),
        ),
      ).toEqual(
        SQLStatement({
          strings: ['SELECT * FROM toto WHERE foo=', ' AND bar=', ' AND baz='],
          values: ['fooVal', 'barVal', 'bazVal'],
        }),
      );
    });
  });

  describe('.format', () => {
    it('should return a formatted string', () =>
      expect(
        SQLStatement.format(sql`SELECT ${'foo'}`, {
          formatString: (str) => `_:${str}`,
          formatValue: (value, index) => `$${index}=${value}`,
        }),
      ).toEqual('_:SELECT $1=foo_:'));
  });

  describe('sql', () => {
    it('should return empty string', () => {
      expect(sql``).toEqual(
        SQLStatement({
          strings: [''],
        }),
      );
    });
    it('should return interpolated string', () => {
      expect(sql`SELECT * FROM foo`).toEqual(
        SQLStatement({
          strings: ['SELECT * FROM foo'],
        }),
      );
    });
    it('should add values', () => {
      expect(sql`SELECT * FROM foo ${'bar'} ${'baz'}`).toEqual(
        SQLStatement({
          strings: ['SELECT * FROM foo ', ' ', ''],
          values: ['bar', 'baz'],
        }),
      );
    });
    it('should concat nested statements', () => {
      expect(sql`SELECT * FROM ${sql`foo WHERE ${'bar'}`} ${'baz'}`).toEqual(
        SQLStatement({
          strings: ['SELECT * FROM foo WHERE ', ' ', ''],
          values: ['bar', 'baz'],
        }),
      );
    });

    describe('.raw', () => {
      it('should return statement', () => {
        expect(sql.raw('foo')).toEqual(
          SQLStatement({
            strings: ['foo'],
            values: [],
          }),
        );
      });
    });
  });
});
