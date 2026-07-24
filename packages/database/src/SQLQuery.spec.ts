import { describe, expect, it } from 'vitest';

import { sql } from './sql.js';
import { SQLDataType } from './SQLDataType.js';
import { SQLQuery } from './SQLQuery.js';

describe('SQLQuery', () => {
  describe('.toSQLStatement()', () => {
    it('should correct statement for AddColumn', () => {
      expect(
        SQLQuery.toSQLStatement(
          SQLQuery.AddColumn({
            columnAttributes: {
              type: SQLDataType.VARCHAR(255),
            },
            columnName: 'anyColumnName',
            tableName: 'anyTableName',
          }),
        ),
      ).toEqual(sql`ALTER TABLE anyTableName ADD anyColumnName VARCHAR(255)`);
    });

    it('should correct statement for AddConstraint', () => {
      expect(
        SQLQuery.toSQLStatement(SQLQuery.AddConstraint({ constraintName: 'anyConstraint', tableName: 'anyTableName' })),
      ).toEqual(sql`ALTER TABLE anyTableName ADD CONSTRAINT anyConstraint`);
    });
    it('should correct statement for CreateSchema', () => {
      expect(SQLQuery.toSQLStatement(SQLQuery.CreateSchema({ schemaName: 'anySchema' }))).toEqual(
        sql`CREATE SCHEMA anySchema`,
      );
    });
    it('should correct statement for CreateTable', () => {
      expect(
        SQLQuery.toSQLStatement(
          SQLQuery.CreateTable({
            tableAttributes: {
              description: { type: SQLDataType.VARCHAR(255) },
              name: { type: SQLDataType.VARCHAR(255) },
            },
            tableName: 'anyTableName',
          }),
        ),
      ).toEqual(sql`CREATE TABLE anyTableName (\n  description VARCHAR(255),\n  name VARCHAR(255)\n)`);
    });

    it('should correct statement for DropSchema', () => {
      expect(SQLQuery.toSQLStatement(SQLQuery.DropSchema({ schemaName: 'anySchema' }))).toEqual(
        sql`DROP SCHEMA anySchema`,
      );
    });
    it('should correct statement for DropTable', () => {
      expect(SQLQuery.toSQLStatement(SQLQuery.DropTable({ tableName: 'anyTableName' }))).toEqual(
        sql`DROP TABLE anyTableName`,
      );
    });
    it('should correct statement for RemoveConstraint', () => {
      expect(
        SQLQuery.toSQLStatement(
          SQLQuery.RemoveConstraint({ constraintName: 'anyConstraint', tableName: 'anyTableName' }),
        ),
      ).toEqual(sql`ALTER TABLE anyTableName DROP CONSTRAINT anyConstraint`);
    });
    it('should correct statement for RemoveColumn', () => {
      expect(
        SQLQuery.toSQLStatement(SQLQuery.RemoveColumn({ columnName: 'anyColumn', tableName: 'anyTableName' })),
      ).toEqual(sql`ALTER TABLE anyTableName DROP COLUMN anyColumn`);
    });
  });
});
