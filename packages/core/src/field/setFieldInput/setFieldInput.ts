import { batch, createId, untrack } from '../../framework/index.ts';
import type {
  InternalFieldStore,
  InternalFormStore,
  Path,
  PathKey,
} from '../../types/index.ts';
import { initializeFieldStore } from '../initializeFieldStore/index.ts';

function setNestedInput(
  internalFieldStore: InternalFieldStore,
  input: unknown
): void {
  internalFieldStore.isTouched.value = true;

  if (internalFieldStore.kind === 'array') {
    const arrayInput = input ?? [];
    const items = internalFieldStore.items.value;
    if (
      // @ts-expect-error
      arrayInput.length < items.length
    ) {
      internalFieldStore.items.value = items.slice(
        0,
        // @ts-expect-error
        arrayInput.length
      );
    } else if (
      // @ts-expect-error
      arrayInput.length > items.length
    ) {
      // @ts-expect-error
      if (arrayInput.length > internalFieldStore.children.length) {
        // TODO: Check if we can merge this for loop with the one below
        const path = JSON.parse(internalFieldStore.name) as PathKey[];
        for (
          let index = internalFieldStore.children.length;
          // @ts-expect-error
          index < arrayInput.length;
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
            arrayInput[index],
            path
          );
          path.pop();
        }
      }
      internalFieldStore.items.value = [
        ...items,
        // @ts-expect-error
        ...arrayInput.slice(items.length).map(createId),
      ];
    }
    for (let index = 0; index < items.length; index++) {
      setNestedInput(
        internalFieldStore.children[index],
        // @ts-expect-error
        arrayInput[index]
      );
    }
    internalFieldStore.input.value = input == null ? input : true;
    internalFieldStore.isDirty.value =
      internalFieldStore.startInput.value !== internalFieldStore.input.value ||
      internalFieldStore.startItems.value.length !== items.length;

    // If it is of kind 'object'
  } else if (internalFieldStore.kind === 'object') {
    for (const key in internalFieldStore.children) {
      setNestedInput(
        internalFieldStore.children[key],
        // @ts-expect-error
        input?.[key]
      );
    }
    internalFieldStore.input.value = input == null ? input : true;
    internalFieldStore.isDirty.value =
      internalFieldStore.startInput.value !== internalFieldStore.input.value;

    // If it is of kind 'value'
  } else {
    internalFieldStore.input.value = input;
    // TODO: Should we add support for Dates and Files?
    const startInput = internalFieldStore.startInput.value;
    internalFieldStore.isDirty.value =
      startInput !== input &&
      // Hint: This check ensures that an empty string or `NaN` does not mark
      // the field as dirty if the start input was `undefined`
      (startInput !== undefined || (input !== '' && !Number.isNaN(input)));
  }
}

export function setFieldInput(
  internalFormStore: InternalFormStore,
  path: Path,
  input: unknown
): void {
  batch(() => {
    untrack(() => {
      let internalFieldStore: InternalFieldStore = internalFormStore;
      for (let index = 0; index < path.length; index++) {
        // @ts-expect-error
        internalFieldStore = internalFieldStore.children[path[index]];
        if (index < path.length - 1) {
          internalFieldStore.input.value = true;
        } else {
          setNestedInput(internalFieldStore, input);
        }
      }
    });
  });
}
