import type { InternalFieldStore, InternalFormStore, Path } from '../../types';

export function getFieldStore(
  internalFormStore: InternalFormStore,
  path: Path
): InternalFieldStore {
  let internalFieldStore: InternalFieldStore = internalFormStore;
  for (const key of path) {
    // @ts-expect-error
    internalFieldStore = internalFieldStore.children[key];
  }
  return internalFieldStore;
}
