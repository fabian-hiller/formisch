import {
  type BaseFormStore,
  batch,
  getFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type RequiredPath,
  type Schema,
  swapItemState,
  untrack,
  type ValidArrayPath,
  validateIfRequired,
} from '@formisch/core';
import type * as v from 'valibot';

export interface SwapConfig<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
> {
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
  readonly at: number;
  readonly and: number;
}

export function swap<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
>(
  form: BaseFormStore<TSchema>,
  config: SwapConfig<TSchema, TFieldArrayPath>
): void {
  // Get internal form and array store
  const internalFormStore = form[INTERNAL];
  const internalArrayStore = getFieldStore(
    internalFormStore,
    config.path
  ) as InternalArrayStore;

  // Get current items of field array
  const items = untrack(() => internalArrayStore.items.value);

  // Continue if both specified indices are valid
  if (
    config.at >= 0 &&
    config.at <= items.length - 1 &&
    config.and >= 0 &&
    config.and <= items.length - 1 &&
    config.at !== config.and
  ) {
    batch(() => {
      // Swap item IDs in items array
      const newItems = [...items];
      const tempItemId = newItems[config.at];
      newItems[config.at] = newItems[config.and];
      newItems[config.and] = tempItemId;
      internalArrayStore.items.value = newItems;

      // Swap child stores directly
      swapItemState(
        internalArrayStore.children[config.at],
        internalArrayStore.children[config.and]
      );

      // Mark field array as touched and update dirty state
      internalArrayStore.isTouched.value = true;
      internalArrayStore.isDirty.value =
        internalArrayStore.startItems.value.join() !== newItems.join();

      // Validate if required
      validateIfRequired(internalFormStore, internalArrayStore, 'input');
    });
  }
}
