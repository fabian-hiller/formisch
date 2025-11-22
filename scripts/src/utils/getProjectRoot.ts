import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Gets the root directory of the project.
 *
 * @returns Absolute path to the project root.
 */
export function getProjectRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '..', '..', '..');
}
