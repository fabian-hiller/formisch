import {
  type BaseFormStore,
  batch,
  copyItemState,
  createId,
  type DeepPartial,
  getFieldStore,
  initializeFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type PathKey,
  type PathValue,
  type RequiredPath,
  resetItemState,
  type Schema,
  untrack,
  type ValidArrayPath,
  validateIfRequired,
} from '@formisch/core';
import type * as v from 'valibot';

export interface InsertConfig<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
> {
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
  readonly at?: number | undefined;
  readonly initialInput?:
    | DeepPartial<
        PathValue<v.InferInput<TSchema>, [...TFieldArrayPath, number]>
      >
    | undefined;
}

export function insert<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
>(
  form: BaseFormStore<TSchema>,
  config: InsertConfig<TSchema, TFieldArrayPath>
): void {
  // Get internal form and array store
  const internalFormStore = form[INTERNAL];
  const internalArrayStore = getFieldStore(
    internalFormStore,
    config.path
  ) as InternalArrayStore;

  // Get current items of field array
  const items = untrack(() => internalArrayStore.items.value);

  // Determine insertion index (default to end of array)
  const insertIndex = config.at === undefined ? items.length : config.at;

  // Continue if insertion index is valid
  if (insertIndex >= 0 && insertIndex <= items.length) {
    batch(() => {
      // Insert new item ID at the specified index
      const newItems = [...items];
      newItems.splice(insertIndex, 0, createId());
      internalArrayStore.items.value = newItems;

      // Move all child stores after the insertion point one index up
      for (let index = items.length; index > insertIndex; index--) {
        copyItemState(
          internalArrayStore.children[index - 1],
          internalArrayStore.children[index]
        );
      }

      if (!internalArrayStore.children[insertIndex]) {
        const path = JSON.parse(internalArrayStore.name) as PathKey[];
        // @ts-expect-error
        internalArrayStore.children[insertIndex] = {};
        path.push(insertIndex);
        initializeFieldStore(
          internalArrayStore.children[insertIndex],
          // @ts-expect-error
          internalArrayStore.schema.item,
          config.initialInput,
          path
        );
      } else {
        resetItemState(
          internalArrayStore.children[insertIndex],
          config.initialInput
        );
      }

      // Mark field array as touched and dirty
      internalArrayStore.isTouched.value = true;
      internalArrayStore.isDirty.value = true;

      // Validate if required
      validateIfRequired(internalFormStore, internalArrayStore, 'input');
    });
  }
}
