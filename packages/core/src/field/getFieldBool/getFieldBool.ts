import type { InternalFieldStore } from '../../types';

export function getFieldBool(
  internalFieldStore: InternalFieldStore,
  type: 'errors' | 'isTouched' | 'isDirty'
): boolean {
  if (internalFieldStore[type].value) {
    return true;
  }

  if (internalFieldStore.kind === 'array') {
    for (
      let index = 0;
      index < internalFieldStore.items.value.length;
      index++
    ) {
      if (getFieldBool(internalFieldStore.children[index], type)) {
        return true;
      }
    }
    return false;
  }

  if (internalFieldStore.kind == 'object') {
    for (const key in internalFieldStore.children) {
      if (getFieldBool(internalFieldStore.children[key], type)) {
        return true;
      }
    }
    return false;
  }

  return false;
}
