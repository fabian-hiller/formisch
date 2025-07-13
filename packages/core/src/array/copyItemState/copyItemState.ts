import { initializeFieldStore } from '../../field/initializeFieldStore/index.ts';
import { batch, untrack } from '../../framework/index.ts';
import type { InternalFieldStore, PathKey } from '../../types/index.ts';

/**
 * Copies the deeply nested state (signal values) from one array item to another.
 * This includes the `isTouched`, `isDirty`, `startInput`, `input`, `startItems`, and `items` properties.
 * Recursively walks through the field stores and copies all signal values.
 *
 * @param internalArrayStore - The field store of the array (not the array item)
 * @param fromIndex - The source index to copy from
 * @param toIndex - The destination index to copy to
 */
export function copyItemState(
  fromInternalFieldStore: InternalFieldStore,
  toInternalFieldStore: InternalFieldStore
): void {
  batch(() => {
    untrack(() => {
      if (
        fromInternalFieldStore.kind === 'array' &&
        toInternalFieldStore.kind === 'array'
      ) {
        const fromItems = fromInternalFieldStore.items.value;

        toInternalFieldStore.isTouched.value =
          fromInternalFieldStore.isTouched.value;
        toInternalFieldStore.isDirty.value =
          fromInternalFieldStore.isDirty.value;
        toInternalFieldStore.startItems.value =
          fromInternalFieldStore.startItems.value;
        toInternalFieldStore.items.value = fromItems;

        let path: PathKey[] | undefined;
        for (let index = 0; index < fromItems.length; index++) {
          if (!toInternalFieldStore.children[index]) {
            path ??= JSON.parse(toInternalFieldStore.name) as PathKey[];
            // @ts-expect-error
            toInternalFieldStore.children[index] = {};
            path.push(index);
            initializeFieldStore(
              toInternalFieldStore.children[index],
              // @ts-expect-error
              toInternalFieldStore.schema.item,
              undefined,
              path
            );
            path.pop();
          }

          copyItemState(
            fromInternalFieldStore.children[index],
            toInternalFieldStore.children[index]
          );
        }
      } else if (
        fromInternalFieldStore.kind === 'object' &&
        toInternalFieldStore.kind === 'object'
      ) {
        for (const key in fromInternalFieldStore.children) {
          copyItemState(
            fromInternalFieldStore.children[key],
            toInternalFieldStore.children[key]
          );
        }
      } else if (
        fromInternalFieldStore.kind === 'value' &&
        toInternalFieldStore.kind === 'value'
      ) {
        toInternalFieldStore.isTouched.value =
          fromInternalFieldStore.isTouched.value;
        toInternalFieldStore.isDirty.value =
          fromInternalFieldStore.isDirty.value;
        toInternalFieldStore.startInput.value =
          fromInternalFieldStore.startInput.value;
        toInternalFieldStore.input.value = fromInternalFieldStore.input.value;
      }
    });
  });
}
