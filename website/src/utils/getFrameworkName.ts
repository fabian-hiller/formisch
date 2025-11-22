import type { Framework } from '~/routes/plugin@framework';
import { FRAMEWORK_NAME_MAP } from '~/routes/plugin@framework';

export function getFrameworkName(key: string): string | undefined {
  return FRAMEWORK_NAME_MAP[key as Framework];
}
