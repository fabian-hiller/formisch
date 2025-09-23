import { initializeFieldStore } from '../../field/initializeFieldStore/index.ts';
import { batch, untrack } from '../../framework/index.ts';
import type { InternalFieldStore, PathKey } from '../../types/index.ts';

/**
 * Swaps the deeply nested state (signal values) between two field stores.
 * This includes the `isTouched`, `isDirty`, `startInput`, `input`, `startItems`, and `items` properties.
 * Recursively walks through the field stores and swaps all signal values.
 *
 * @param firstInternalFieldStore - The first field store to swap
 * @param secondInternalFieldStore - The second field store to swap
 */
export function swapItemState(
  firstInternalFieldStore: InternalFieldStore,
  secondInternalFieldStore: InternalFieldStore
): void {
  batch(() => {
    untrack(() => {
      const tempElements = firstInternalFieldStore.elements;
      firstInternalFieldStore.elements = secondInternalFieldStore.elements;
      secondInternalFieldStore.elements = tempElements;

      const tempErrors = firstInternalFieldStore.errors.value;
      firstInternalFieldStore.errors.value =
        secondInternalFieldStore.errors.value;
      secondInternalFieldStore.errors.value = tempErrors;

      const tempStartInput = firstInternalFieldStore.startInput.value;
      firstInternalFieldStore.startInput.value =
        secondInternalFieldStore.startInput.value;
      secondInternalFieldStore.startInput.value = tempStartInput;

      const tempInput = firstInternalFieldStore.input.value;
      firstInternalFieldStore.input.value =
        secondInternalFieldStore.input.value;
      secondInternalFieldStore.input.value = tempInput;

      const tempIsTouched = firstInternalFieldStore.isTouched.value;
      firstInternalFieldStore.isTouched.value =
        secondInternalFieldStore.isTouched.value;
      secondInternalFieldStore.isTouched.value = tempIsTouched;

      const tempIsDirty = firstInternalFieldStore.isDirty.value;
      firstInternalFieldStore.isDirty.value =
        secondInternalFieldStore.isDirty.value;
      secondInternalFieldStore.isDirty.value = tempIsDirty;

      if (
        firstInternalFieldStore.kind === 'array' &&
        secondInternalFieldStore.kind === 'array'
      ) {
        const firstItems = firstInternalFieldStore.items.value;
        const secondItems = secondInternalFieldStore.items.value;

        // Swap array-specific properties
        const tempStartItems = firstInternalFieldStore.startItems.value;
        firstInternalFieldStore.startItems.value =
          secondInternalFieldStore.startItems.value;
        secondInternalFieldStore.startItems.value = tempStartItems;

        firstInternalFieldStore.items.value = secondItems;
        secondInternalFieldStore.items.value = firstItems;

        // Ensure children exist for both stores and swap their states
        const maxLength = Math.max(firstItems.length, secondItems.length);
        let firstPath: PathKey[] | undefined;
        let secondPath: PathKey[] | undefined;

        for (let index = 0; index < maxLength; index++) {
          // Initialize missing children if needed
          if (!firstInternalFieldStore.children[index]) {
            firstPath ??= JSON.parse(firstInternalFieldStore.name) as PathKey[];
            // @ts-expect-error
            firstInternalFieldStore.children[index] = {};
            firstPath.push(index);
            initializeFieldStore(
              firstInternalFieldStore.children[index],
              // @ts-expect-error
              firstInternalFieldStore.schema.item,
              undefined,
              firstPath
            );
            firstPath.pop();
          }

          if (!secondInternalFieldStore.children[index]) {
            secondPath ??= JSON.parse(
              secondInternalFieldStore.name
            ) as PathKey[];
            // @ts-expect-error
            secondInternalFieldStore.children[index] = {};
            secondPath.push(index);
            initializeFieldStore(
              secondInternalFieldStore.children[index],
              // @ts-expect-error
              secondInternalFieldStore.schema.item,
              undefined,
              secondPath
            );
            secondPath.pop();
          }

          // Recursively swap children
          swapItemState(
            firstInternalFieldStore.children[index],
            secondInternalFieldStore.children[index]
          );
        }
      } else if (
        firstInternalFieldStore.kind === 'object' &&
        secondInternalFieldStore.kind === 'object'
      ) {
        for (const key in firstInternalFieldStore.children) {
          swapItemState(
            firstInternalFieldStore.children[key],
            secondInternalFieldStore.children[key]
          );
        }
      }
    });
  });
}
