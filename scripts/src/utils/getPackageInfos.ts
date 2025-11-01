import fs from 'node:fs';
import path from 'node:path';
import { readPackageJson } from './readPackageJson';

/**
 * Package info type.
 */
export type PackageInfo = {
  name: string;
  version: string;
  path: string;
};

/**
 * Gets package information from all packages in a directory by scanning for package.json files.
 * Unlike getFolderNames which returns all subdirectory names, this function only returns
 * information for directories that contain valid package.json files.
 *
 * @param directory The directory to scan for packages.
 *
 * @returns Array of PackageInfo objects sorted by name.
 */
export function getPackageInfos(directory: string): PackageInfo[] {
  const packages: PackageInfo[] = [];

  if (!fs.existsSync(directory)) {
    return packages;
  }

  const items = fs.readdirSync(directory, { withFileTypes: true });

  // Scan directories for package.json files
  for (const item of items) {
    if (item.isDirectory() && !item.name.startsWith('.')) {
      const packageJsonPath = path.join(directory, item.name, 'package.json');
      const packageInfo = readPackageJson(packageJsonPath);
      if (packageInfo) {
        packages.push({
          name: packageInfo.name,
          version: packageInfo.version,
          path: packageJsonPath,
        });
      }
    }
  }

  return packages.sort((a, b) => a.name.localeCompare(b.name));
}
