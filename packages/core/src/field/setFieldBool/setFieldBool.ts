import { batch, untrack } from '../../framework/index.ts';
import type { InternalFieldStore } from '../../types';

export function setFieldBool(
  internalFieldStore: InternalFieldStore,
  type: 'isTouched' | 'isDirty',
  bool: boolean
): void {
  batch(() => {
    if (internalFieldStore.kind === 'array') {
      internalFieldStore[type].value = bool;
      for (
        let index = 0;
        index < untrack(() => internalFieldStore.items.value).length;
        index++
      ) {
        setFieldBool(internalFieldStore.children[index], type, bool);
      }
    } else if (internalFieldStore.kind == 'object') {
      for (const key in internalFieldStore.children) {
        setFieldBool(internalFieldStore.children[key], type, bool);
      }
    } else {
      internalFieldStore[type].value = bool;
    }
  });
}
