/**
 * An type that represents a file path
 */
export type FilePath = string;

/**
 * Enum of all file types
 */
export type FileType = 'file' | 'directory' | 'symlink';
export const FileType = Object.freeze({
  /**
   * File type
   */
  File: 'file',
  /**
   * Directory type
   */
  Directory: 'directory',
  /**
   * Symbolic link type
   */
  SymbolicLink: 'symlink',
} as const);
