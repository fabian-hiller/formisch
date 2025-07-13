import { batch, createId } from '../../framework/index.ts';
import type { InternalFieldStore, PathKey } from '../../types/index.ts';
import { initializeFieldStore } from '../initializeFieldStore/index.ts';

export function setInitialFieldInput(
  internalFieldStore: InternalFieldStore,
  initialInput: unknown
): void {
  batch(() => {
    if (internalFieldStore.kind === 'array') {
      if (
        // @ts-expect-error
        initialInput.length > internalFieldStore.children.length
      ) {
        const path = JSON.parse(internalFieldStore.name) as PathKey[];
        for (
          let index = internalFieldStore.children.length;
          // @ts-expect-error
          index < initialInput.length;
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
            initialInput[index],
            path
          );
          path.pop();
        }
      }
      internalFieldStore.initialItems.value =
        // @ts-expect-error
        initialInput.map(createId);
      for (let index = 0; index < internalFieldStore.children.length; index++) {
        setInitialFieldInput(
          internalFieldStore.children[index],
          // @ts-expect-error
          initialInput?.[index]
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
