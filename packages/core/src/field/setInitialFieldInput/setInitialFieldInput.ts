import { batch, createId } from '../../framework/index.ts';
import type { InternalFieldStore, PathKey } from '../../types/index.ts';
import { initializeFieldStore } from '../initializeFieldStore/index.ts';

export function setInitialFieldInput(
  internalFieldStore: InternalFieldStore,
  initialInput: unknown
): void {
  batch(() => {
    if (internalFieldStore.kind === 'array') {
      const initialArrayInput = initialInput ?? [];
      if (
        // @ts-expect-error
        initialArrayInput.length > internalFieldStore.children.length
      ) {
        const path = JSON.parse(internalFieldStore.name) as PathKey[];
        for (
          let index = internalFieldStore.children.length;
          // @ts-expect-error
          index < initialArrayInput.length;
          index++
        ) {
          // @ts-expect-error
          internalFieldStore.children[index] = {};
          path.push(index);
          initializeFieldStore(
            internalFieldStore.children[index],
            // @ts-expect-error
            internalFieldStore.schema.item,
            // @ts-expect-error
            initialArrayInput[index],
            path
          );
          path.pop();
        }
      }
      internalFieldStore.initialItems.value =
        // @ts-expect-error
        initialArrayInput.map(createId);
      for (let index = 0; index < internalFieldStore.children.length; index++) {
        setInitialFieldInput(
          internalFieldStore.children[index],
          // @ts-expect-error
          initialArrayInput[index]
        );
      }
    } else if (internalFieldStore.kind === 'object') {
      for (const key in internalFieldStore.children) {
        setInitialFieldInput(
          internalFieldStore.children[key],
          // @ts-expect-error
          initialInput?.[key]
        );
      }
    } else {
      internalFieldStore.initialInput.value = initialInput;
    }
  });
}
