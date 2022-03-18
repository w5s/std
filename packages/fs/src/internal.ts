import * as fs from 'node:fs';
import * as path from 'node:path';
import { FileType } from './data';

export function pathInclude(source: string, destination: string, separator: string = path.sep): boolean {
  if (source === destination) {
    return false;
  }
  const sourceParts = source.split(separator);
  const destinationParts = destination.split(separator);
  return sourceParts.every((current, i) => destinationParts[i] === current);
}

export async function fsExists(filePath: string) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export function fsExistsSync(filePath: string) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export const fsRemove = fs.promises.rm;

export const fsRemoveSync = fs.rmSync;

export const fsRename = fs.promises.rename;

export const fsRenameSync = fs.renameSync;

export const fsMkdir = fs.promises.mkdir;

export const fsMkdirSync = fs.mkdirSync;

export const fsLinkType = async (p: string) => {
  try {
    return fileTypeFromStats(await fs.promises.lstat(p));
  } catch {
    // throw error;
    return undefined;
  }
};

export const fsLinkTypeSync = (p: string) => {
  try {
    return fileTypeFromStats(fs.lstatSync(p));
  } catch {
    return undefined;
  }
};

function fileTypeFromStats(stats: fs.Stats): FileType | undefined {
  return stats.isFile() ? 'file' : stats.isDirectory() ? 'directory' : stats.isSymbolicLink() ? 'symlink' : undefined;
}
