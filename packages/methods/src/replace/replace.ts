import {
  type BaseFormStore,
  batch,
  createId,
  type DeepPartial,
  getFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type PathValue,
  type RequiredPath,
  resetItemState,
  type Schema,
  untrack,
  type ValidArrayPath,
  validateIfRequired,
} from '@formisch/core';
import type * as v from 'valibot';

export interface ReplaceConfig<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
> {
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
  readonly at: number;
  readonly initialInput?:
    | DeepPartial<
        PathValue<v.InferInput<TSchema>, [...TFieldArrayPath, number]>
      >
    | undefined;
}

export function replace<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
>(
  form: BaseFormStore<TSchema>,
  config: ReplaceConfig<TSchema, TFieldArrayPath>
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
      // Replace item ID to trigger reactivity
      const newItems = [...items];
      newItems[config.at] = createId();
      internalArrayStore.items.value = newItems;

      // Replace input of field array item
      resetItemState(
        internalArrayStore.children[config.at],
        config.initialInput
      );

      // Mark field array as touched and dirty
      internalArrayStore.isTouched.value = true;
      internalArrayStore.isDirty.value = true;

      // Validate if required
      // TODO: Should we validate on touch, change and blur too?
      validateIfRequired(internalFormStore, internalArrayStore, 'input');
    });
  }
}
