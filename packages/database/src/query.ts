import { Struct } from '@w5s/core/dist/Struct.js';
import { assertNever } from '@w5s/error/dist/assertNever.js';
import { sql, SQLStatement } from './sql.js';
import { SQLDataType } from './dataType.js';

export type SQLQuery =
  | SQLQuery.AddColumn
  | SQLQuery.AddConstraint
  | SQLQuery.CreateSchema
  | SQLQuery.CreateTable
  | SQLQuery.DropSchema
  | SQLQuery.DropTable
  | SQLQuery.RemoveConstraint
  | SQLQuery.RemoveColumn;
export namespace SQLQuery {
  export type Order = 'ASC' | 'DESC';
  export const Order = Object.freeze({
    Ascending: 'ASC',
    Descending: 'DESC',
  });

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
  export const AddColumn = Struct.define<AddColumn>({ typeName: 'SQLAddColumn' });

  export interface AddConstraint
    extends Struct<{
      [Struct.type]: 'SQLAddConstraint';
      tableName: string;
      constraintName: string;
    }> {}
  export const AddConstraint = Struct.define<AddConstraint>({ typeName: 'SQLAddConstraint' });

  export interface CreateSchema
    extends Struct<{
      [Struct.type]: 'SQLCreateSchema';
      schemaName: string;
    }> {}
  export const CreateSchema = Struct.define<CreateSchema>({ typeName: 'SQLCreateSchema' });

  export interface CreateTable
    extends Struct<{
      [Struct.type]: 'SQLCreateTable';
      tableName: string;
      tableAttributes: TableAttributes;
    }> {}
  export const CreateTable = Struct.define<CreateTable>({ typeName: 'SQLCreateTable' });

  export interface DropSchema
    extends Struct<{
      [Struct.type]: 'SQLDropSchema';
      schemaName: string;
    }> {}
  export const DropSchema = Struct.define<DropSchema>({ typeName: 'SQLDropSchema' });

  export interface DropTable
    extends Struct<{
      [Struct.type]: 'SQLDropTable';
      tableName: string;
    }> {}
  export const DropTable = Struct.define<DropTable>({ typeName: 'SQLDropTable' });

  export interface RemoveConstraint
    extends Struct<{
      [Struct.type]: 'SQLRemoveConstraint';
      tableName: string;
      constraintName: string;
    }> {}
  export const RemoveConstraint = Struct.define<RemoveConstraint>({ typeName: 'SQLRemoveConstraint' });

  export interface RemoveColumn
    extends Struct<{
      [Struct.type]: 'SQLRemoveColumn';
      tableName: string;
      columnName: string;
    }> {}
  export const RemoveColumn = Struct.define<RemoveColumn>({ typeName: 'SQLRemoveColumn' });

  function objectEntries<V>(object: Record<string, V>): Array<[string, V]> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Object.keys(object).map((propertyName) => [propertyName, object[propertyName]!]);
  }

  function stringifyDataType(data: SQLDataType): string {
    return SQLDataType.format(data);
  }

  function stringifyColumnAttributes(columnAttributes: ColumnAttributes): string {
    return stringifyDataType(columnAttributes.type);
  }

  function stringifyTableAttributes(tableAttributes: TableAttributes): string {
    return objectEntries(tableAttributes)
      .map(([columnName, columnAttributes]) => `\n  ${columnName} ${stringifyColumnAttributes(columnAttributes)}`)
      .join(',');
  }

  function alterTable(tableName: string, operation: string): SQLStatement {
    return sql`ALTER TABLE ${sql.raw(tableName)} ${sql.raw(operation)}`;
  }

  export function toSQLStatement(query: SQLQuery): SQLStatement {
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
}
