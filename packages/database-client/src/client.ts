/**
 * The environment represents the way to connect to a database server
 */
export interface AbstractDatabaseClient<Name extends string> {
  databaseType: Name;
}
