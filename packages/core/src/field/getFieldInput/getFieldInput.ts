import type { InternalFieldStore } from '../../types';

export function getFieldInput(internalFieldStore: InternalFieldStore): unknown {
  if (internalFieldStore.kind === 'array') {
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

  if (internalFieldStore.kind === 'object') {
    const value: Record<string, unknown> = {};
    for (const key in internalFieldStore.children) {
      value[key] = getFieldInput(internalFieldStore.children[key]);
    }
    return value;
  }

  return internalFieldStore.input.value;
}
