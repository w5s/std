/**
 * The environment represents the way to connect to a database server
 */
export interface AbstractDatabase<Name extends string> {
  databaseType: Name;
}
