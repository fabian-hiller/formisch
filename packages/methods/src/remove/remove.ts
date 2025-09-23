import {
  type BaseFormStore,
  batch,
  copyItemState,
  getFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type RequiredPath,
  type Schema,
  untrack,
  type ValidArrayPath,
  validateIfRequired,
} from '@formisch/core';
import type * as v from 'valibot';

export interface RemoveConfig<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
> {
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
  readonly at: number;
}

export function remove<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
>(
  form: BaseFormStore<TSchema>,
  config: RemoveConfig<TSchema, TFieldArrayPath>
): void {
  // Get internal form and array store
  const internalFormStore = form[INTERNAL];
  const internalArrayStore = getFieldStore(
    internalFormStore,
    config.path
  ) as InternalArrayStore;

  // Get current items of field array
  const items = untrack(() => internalArrayStore.items.value);

  // Continue if specified index is valid
  if (config.at >= 0 && config.at <= items.length - 1) {
    batch(() => {
      // Remove item ID from the items array
      const newItems = [...items];
      newItems.splice(config.at, 1);
      internalArrayStore.items.value = newItems;

      // Move all child stores after the removed item one index down
      for (let index = config.at; index < items.length - 1; index++) {
        copyItemState(
          internalArrayStore.children[index + 1],
          internalArrayStore.children[index]
        );
      }

      // Mark field array as touched and update dirty state
      internalArrayStore.isTouched.value = true;
      internalArrayStore.isDirty.value =
        internalArrayStore.startItems.value.join() !== newItems.join();

      // Validate if required
      // TODO: Should we validate on touch, change and blur too?
      validateIfRequired(internalFormStore, internalArrayStore, 'input');
    });
  }
}
