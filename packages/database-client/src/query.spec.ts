import { SQLDataType } from './dataType';
import { sql } from './sql';
import { SQLQuery } from './query';

describe('SQLQuery', () => {
  describe('.toSQLStatement()', () => {
    test('should correct statement for AddColumn', () => {
      expect(
        SQLQuery.toSQLStatement(
          SQLQuery.AddColumn({
            tableName: 'anyTableName',
            columnName: 'anyColumnName',
            columnAttributes: {
              type: SQLDataType.VARCHAR(255),
            },
          })
        )
      ).toEqual(sql`ALTER TABLE anyTableName ADD anyColumnName VARCHAR(255)`);
    });

    test('should correct statement for AddConstraint', () => {
      expect(
        SQLQuery.toSQLStatement(SQLQuery.AddConstraint({ tableName: 'anyTableName', constraintName: 'anyConstraint' }))
      ).toEqual(sql`ALTER TABLE anyTableName ADD CONSTRAINT anyConstraint`);
    });
    test('should correct statement for CreateSchema', () => {
      expect(SQLQuery.toSQLStatement(SQLQuery.CreateSchema({ schemaName: 'anySchema' }))).toEqual(
        sql`CREATE SCHEMA anySchema`
      );
    });
    test('should correct statement for CreateTable', () => {
      expect(
        SQLQuery.toSQLStatement(
          SQLQuery.CreateTable({
            tableName: 'anyTableName',
            tableAttributes: {
              name: { type: SQLDataType.VARCHAR(255) },
              description: { type: SQLDataType.VARCHAR(255) },
            },
          })
        )
      ).toEqual(sql`CREATE TABLE anyTableName (\n  name VARCHAR(255),\n  description VARCHAR(255)\n)`);
    });

    test('should correct statement for DropSchema', () => {
      expect(SQLQuery.toSQLStatement(SQLQuery.DropSchema({ schemaName: 'anySchema' }))).toEqual(
        sql`DROP SCHEMA anySchema`
      );
    });
    test('should correct statement for DropTable', () => {
      expect(SQLQuery.toSQLStatement(SQLQuery.DropTable({ tableName: 'anyTableName' }))).toEqual(
        sql`DROP TABLE anyTableName`
      );
    });
    test('should correct statement for RemoveConstraint', () => {
      expect(
        SQLQuery.toSQLStatement(
          SQLQuery.RemoveConstraint({ tableName: 'anyTableName', constraintName: 'anyConstraint' })
        )
      ).toEqual(sql`ALTER TABLE anyTableName DROP CONSTRAINT anyConstraint`);
    });
    test('should correct statement for RemoveColumn', () => {
      expect(
        SQLQuery.toSQLStatement(SQLQuery.RemoveColumn({ tableName: 'anyTableName', columnName: 'anyColumn' }))
      ).toEqual(sql`ALTER TABLE anyTableName DROP COLUMN anyColumn`);
    });
  });
});
