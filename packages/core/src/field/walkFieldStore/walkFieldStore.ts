import { untrack } from '../../framework/index.ts';
import type { InternalFieldStore } from '../../types/index.ts';

export function walkFieldStore(
  internalFieldStore: InternalFieldStore,
  callback: (internalFieldStore: InternalFieldStore) => void
): void {
  callback(internalFieldStore);
  if (internalFieldStore.kind === 'array') {
    for (
      let index = 0;
      index < untrack(() => internalFieldStore.items.value).length;
      index++
    ) {
      walkFieldStore(internalFieldStore.children[index], callback);
    }
  } else if (internalFieldStore.kind === 'object') {
    for (const key in internalFieldStore.children) {
      walkFieldStore(internalFieldStore.children[key], callback);
    }
  }
}
