import { Struct } from '@w5s/core/dist/Struct.js';
import { assertNever } from '@w5s/error/dist/assertNever.js';
import { sql, SQLStatement } from './sql.js';
import { SQLDataType } from './SQLDataType.js';

export type SQLQuery =
  | SQLQuery.AddColumn
  | SQLQuery.AddConstraint
  | SQLQuery.CreateSchema
  | SQLQuery.CreateTable
  | SQLQuery.DropSchema
  | SQLQuery.DropTable
  | SQLQuery.RemoveConstraint
  | SQLQuery.RemoveColumn;

const Order = Object.freeze({
  Ascending: 'ASC',
  Descending: 'DESC',
});
const AddColumn = Struct.define<SQLQuery.AddColumn>({ typeName: 'SQLAddColumn' });
const AddConstraint = Struct.define<SQLQuery.AddConstraint>({ typeName: 'SQLAddConstraint' });
const CreateSchema = Struct.define<SQLQuery.CreateSchema>({ typeName: 'SQLCreateSchema' });
const CreateTable = Struct.define<SQLQuery.CreateTable>({ typeName: 'SQLCreateTable' });
const DropSchema = Struct.define<SQLQuery.DropSchema>({ typeName: 'SQLDropSchema' });
const DropTable = Struct.define<SQLQuery.DropTable>({ typeName: 'SQLDropTable' });
const RemoveConstraint = Struct.define<SQLQuery.RemoveConstraint>({ typeName: 'SQLRemoveConstraint' });
const RemoveColumn = Struct.define<SQLQuery.RemoveColumn>({ typeName: 'SQLRemoveColumn' });

function toSQLStatement(query: SQLQuery): SQLStatement {
  const identifier = sql.raw;
  switch (query._) {
    case AddColumn.typeName: {
      return alterTable(
        query.tableName,
        `ADD ${query.columnName} ${stringifyColumnAttributes(query.columnAttributes)}`,
      );
    }
    case AddConstraint.typeName: {
      return alterTable(query.tableName, `ADD CONSTRAINT ${query.constraintName}`);
    }
    case CreateSchema.typeName: {
      return sql`CREATE SCHEMA ${identifier(query.schemaName)}`;
    }
    case CreateTable.typeName: {
      return sql`CREATE TABLE ${identifier(query.tableName)} (${sql.raw(
        stringifyTableAttributes(query.tableAttributes),
      )}\n)`;
    }
    case DropSchema.typeName: {
      return sql`DROP SCHEMA ${identifier(query.schemaName)}`;
    }
    case DropTable.typeName: {
      return sql`DROP TABLE ${identifier(query.tableName)}`;
    }
    case RemoveConstraint.typeName: {
      return alterTable(query.tableName, `DROP CONSTRAINT ${query.constraintName}`);
    }
    case RemoveColumn.typeName: {
      return alterTable(query.tableName, `DROP COLUMN ${query.columnName}`);
    }
    default: {
      return assertNever(query);
    }
  }
}
/**
 * @namespace
 */
export const SQLQuery = {
  Order,
  AddColumn,
  AddConstraint,
  CreateSchema,
  CreateTable,
  DropSchema,
  DropTable,
  RemoveConstraint,
  RemoveColumn,
  toSQLStatement,
};

export namespace SQLQuery {
  export type Order = 'ASC' | 'DESC';

  export type OrderClause = string | Readonly<[string, Order]>;

  type TriggerAction = 'CASCADE' | 'RESTRICT' | 'SET DEFAULT' | 'SET NULL' | 'NO ACTION';

  type ColumnReferencesOptions = {
    /**
     * Reference to another table
     */
    tableName?: string;

    /**
     * Reference to a column
     */
    columnName?: string;
  };

  export interface ColumnAttributes {
    /**
     * Nullable column
     */
    allowNull?: boolean;

    /**
     * Default value
     */
    defaultValue?: any;

    /**
     * Column type
     */
    type: SQLDataType;

    /**
     * Unique constraint on column
     */
    unique?: boolean | string | { name: string; message: string };

    /**
     * Primary key field
     */
    primaryKey?: boolean;

    /**
     * Auto-incremented field
     */
    autoIncrement?: boolean;

    /**
     * Database comment
     */
    comment?: string;

    /**
     * An object with reference configurations
     */
    references?: ColumnReferencesOptions;

    /**
     * Trigger action when updated
     */
    onUpdate?: TriggerAction;

    /**
     * Trigger action when deleted
     */
    onDelete?: TriggerAction;

    // values?: string[];
  }
  export interface TableAttributes extends Record<string, ColumnAttributes> {}

  export interface AddColumn
    extends Struct<{
      [Struct.type]: 'SQLAddColumn';
      tableName: string;
      columnName: string;
      columnAttributes: ColumnAttributes;
    }> {}

  export interface AddConstraint
    extends Struct<{
      [Struct.type]: 'SQLAddConstraint';
      tableName: string;
      constraintName: string;
    }> {}

  export interface CreateSchema
    extends Struct<{
      [Struct.type]: 'SQLCreateSchema';
      schemaName: string;
    }> {}

  export interface CreateTable
    extends Struct<{
      [Struct.type]: 'SQLCreateTable';
      tableName: string;
      tableAttributes: TableAttributes;
    }> {}

  export interface DropSchema
    extends Struct<{
      [Struct.type]: 'SQLDropSchema';
      schemaName: string;
    }> {}

  export interface DropTable
    extends Struct<{
      [Struct.type]: 'SQLDropTable';
      tableName: string;
    }> {}

  export interface RemoveConstraint
    extends Struct<{
      [Struct.type]: 'SQLRemoveConstraint';
      tableName: string;
      constraintName: string;
    }> {}

  export interface RemoveColumn
    extends Struct<{
      [Struct.type]: 'SQLRemoveColumn';
      tableName: string;
      columnName: string;
    }> {}
}

function objectEntries<V>(object: Record<string, V>): Array<[string, V]> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return Object.keys(object).map((propertyName) => [propertyName, object[propertyName]!]);
}

function stringifyDataType(data: SQLDataType): string {
  return SQLDataType.format(data);
}

function stringifyColumnAttributes(columnAttributes: SQLQuery.ColumnAttributes): string {
  return stringifyDataType(columnAttributes.type);
}

function stringifyTableAttributes(tableAttributes: SQLQuery.TableAttributes): string {
  return objectEntries(tableAttributes)
    .map(([columnName, columnAttributes]) => `\n  ${columnName} ${stringifyColumnAttributes(columnAttributes)}`)
    .join(',');
}

function alterTable(tableName: string, operation: string): SQLStatement {
  return sql`ALTER TABLE ${sql.raw(tableName)} ${sql.raw(operation)}`;
}
