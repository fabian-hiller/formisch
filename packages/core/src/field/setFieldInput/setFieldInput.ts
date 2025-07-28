import { batch, createId, untrack } from '../../framework/index.ts';
import type { InternalFieldStore, PathKey } from '../../types/index.ts';
import { initializeFieldStore } from '../initializeFieldStore/index.ts';

export function setFieldInput(
  internalFieldStore: InternalFieldStore,
  input: unknown
): void {
  batch(() => {
    if (internalFieldStore.kind === 'array') {
      const items = untrack(() => internalFieldStore.items.value);
      if (
        // @ts-expect-error
        input.length < items.length
      ) {
        internalFieldStore.items.value = items.slice(
          0,
          // @ts-expect-error
          input.length
        );
      } else if (
        // @ts-expect-error
        input.length > items.length
      ) {
        // @ts-expect-error
        if (input.length > internalFieldStore.children.length) {
          // TODO: Check if we can merge this for loop with the one below
          const path = JSON.parse(internalFieldStore.name) as PathKey[];
          for (
            let index = internalFieldStore.children.length;
            // @ts-expect-error
            index < input.length;
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
              input[index],
              path
            );
            path.pop();
          }
        }
        internalFieldStore.items.value = [
          ...items,
          // @ts-expect-error
          ...input.slice(items.length).map(createId),
        ];
      }
      for (let index = 0; index < items.length; index++) {
        setFieldInput(
          internalFieldStore.children[index],
          // @ts-expect-error
          input[index]
        );
      }
      internalFieldStore.isDirty.value =
        untrack(() => internalFieldStore.startItems.value).length !==
        items.length;
    } else if (internalFieldStore.kind === 'object') {
      for (const key in internalFieldStore.children) {
        setFieldInput(
          internalFieldStore.children[key],
          // @ts-expect-error
          input[key]
        );
      }
    } else {
      internalFieldStore.input.value = input;
      internalFieldStore.isTouched.value = true;
      // TODO: Should we add support for Dates and Files?
      const startInput = untrack(() => internalFieldStore.startInput.value);
      internalFieldStore.isDirty.value =
        startInput !== input &&
        // Hint: This check ensures that an empty string or `NaN` does not mark
        // the field as dirty if the start input was `undefined`
        (startInput !== undefined || (input !== '' && !Number.isNaN(input)));
    }
  });
}
