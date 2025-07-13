import { batch, createId } from '../../framework/index.ts';
import type { InternalFieldStore } from '../../types/index.ts';

/**
 * Resets the state of an array item (signal values) deeply nested.
 * Sets `isTouched` and `isDirty` to `false` and `startInput`, `input`,
 * `startItems` and `items` to the new input.
 * Keeps the `initialInput` and `initialItems` state unchanged for form reset functionality.
 *
 * @param internalFieldStore - The field store of the array item
 * @param initialInput - The new input value (can be any type including array or object)
 */
export function resetItemState(
  internalFieldStore: InternalFieldStore,
  initialInput: unknown
): void {
  batch(() => {
    if (internalFieldStore.kind === 'array') {
      internalFieldStore.isTouched.value = false;
      internalFieldStore.isDirty.value = false;

      if (initialInput) {
        // @ts-expect-error
        const newItems = initialInput.map(createId);
        internalFieldStore.startItems.value = newItems;
        internalFieldStore.items.value = newItems;

        for (
          let index = 0;
          // @ts-expect-error
          index < initialInput.length;
          index++
        ) {
          if (internalFieldStore.children[index]) {
            resetItemState(
              internalFieldStore.children[index],
              // @ts-expect-error
              initialInput[index]
            );
          }
        }
      } else {
        internalFieldStore.startItems.value = [];
        internalFieldStore.items.value = [];
      }
    } else if (internalFieldStore.kind === 'object') {
      for (const key in internalFieldStore.children) {
        resetItemState(
          internalFieldStore.children[key],
          // @ts-expect-error
          initialInput?.[key]
        );
      }
    } else {
      internalFieldStore.isTouched.value = false;
      internalFieldStore.isDirty.value = false;
      internalFieldStore.startInput.value = initialInput;
      internalFieldStore.input.value = initialInput;
    }
  });
}
