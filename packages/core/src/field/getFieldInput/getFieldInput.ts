import type { InternalFieldStore } from '../../types';

export function getFieldInput(internalFieldStore: InternalFieldStore): unknown {
  if (internalFieldStore.kind === 'array') {
    if (internalFieldStore.input.value) {
      const value = [];
      for (
        let index = 0;
        index < internalFieldStore.items.value.length;
        index++
      ) {
        value[index] = getFieldInput(internalFieldStore.children[index]);
      }
      return value;
    }
    return internalFieldStore.input.value;
  }

  if (internalFieldStore.kind === 'object') {
    if (internalFieldStore.input.value) {
      const value: Record<string, unknown> = {};
      for (const key in internalFieldStore.children) {
        value[key] = getFieldInput(internalFieldStore.children[key]);
      }
      return value;
    }
    return internalFieldStore.input.value;
  }

  return internalFieldStore.input.value;
}
