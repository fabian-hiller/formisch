import fs from 'node:fs';

/**
 * Gets all folder names from a directory.
 *
 * @param directory The path to the directory.
 *
 * @returns Array of folder names.
 */
export function getFolderNames(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const folders = fs.readdirSync(directory, { withFileTypes: true });
  return folders
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('.'))
    .map((dirent) => dirent.name);
}
