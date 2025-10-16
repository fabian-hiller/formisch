import { batch, createId } from '../../framework/index.ts';
import type { InternalFieldStore } from '../../types/index.ts';

/**
 * Resets the state of a field store (signal values) deeply nested. Sets
 * `elements` to empty array, `errors` to `null`, `isTouched` and `isDirty` to
 * `false`, and `startInput`, `input`, `startItems`, and `items` to the new
 * input value. Keeps the `initialInput` and `initialItems` state unchanged for
 * form reset functionality.
 *
 * @param internalFieldStore The field store to reset.
 * @param initialInput The new input value (can be any type including array or object).
 */
export function resetItemState(
  internalFieldStore: InternalFieldStore,
  initialInput: unknown
): void {
  // Batch all state updates for optimal reactivity performance
  batch(() => {
    // Clear elements array
    internalFieldStore.elements = [];

    // Clear errors
    internalFieldStore.errors.value = null;

    // Reset touched to false
    internalFieldStore.isTouched.value = false;

    // Reset dirty to false
    internalFieldStore.isDirty.value = false;

    // If field store is array or object, handle complex type reset
    if (
      internalFieldStore.kind === 'array' ||
      internalFieldStore.kind === 'object'
    ) {
      // For arrays and objects, input is null/undefined or true (not actual value)
      const objectInput = initialInput == null ? initialInput : true;

      // Set start input
      internalFieldStore.startInput.value = objectInput;

      // Set current input
      internalFieldStore.input.value = objectInput;

      // If field store is array, handle array-specific reset
      if (internalFieldStore.kind === 'array') {
        // If initial input is provided, create items with IDs
        if (initialInput) {
          // Create new items array with unique IDs for each item
          // @ts-expect-error
          const newItems = initialInput.map(createId);

          // Set start items
          internalFieldStore.startItems.value = newItems;

          // Set current items
          internalFieldStore.items.value = newItems;

          // Reset state for each array item
          for (
            let index = 0;
            // @ts-expect-error
            index < initialInput.length;
            index++
          ) {
            // If child exists at this index, reset its state
            if (internalFieldStore.children[index]) {
              // Recursively reset child with corresponding input
              resetItemState(
                internalFieldStore.children[index],
                // @ts-expect-error
                initialInput[index]
              );
            }
          }

          // Otherwise, clear items arrays
        } else {
          // Set start items to empty array
          internalFieldStore.startItems.value = [];

          // Set current items to empty array
          internalFieldStore.items.value = [];
        }

        // Otherwise, if field store is object, handle object-specific reset
      } else {
        // Reset state for each object property
        for (const key in internalFieldStore.children) {
          // Recursively reset child with corresponding input
          resetItemState(
            internalFieldStore.children[key],
            // @ts-expect-error
            initialInput?.[key]
          );
        }
      }

      // Otherwise, if field store is value, handle primitive type reset
    } else {
      // Set start input
      internalFieldStore.startInput.value = initialInput;

      // Set current input
      internalFieldStore.input.value = initialInput;
    }
  });
}
