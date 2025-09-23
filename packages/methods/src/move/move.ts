import {
  type BaseFormStore,
  batch,
  copyItemState,
  getFieldStore,
  initializeFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type InternalFieldStore,
  type RequiredPath,
  type Schema,
  untrack,
  type ValidArrayPath,
  validateIfRequired,
} from '@formisch/core';
import type * as v from 'valibot';

export interface MoveConfig<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
> {
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
  readonly from: number;
  readonly to: number;
}

export function move<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
>(
  form: BaseFormStore<TSchema>,
  config: MoveConfig<TSchema, TFieldArrayPath>
): void {
  // Get internal form and array store
  const internalFormStore = form[INTERNAL];
  const internalArrayStore = getFieldStore(
    internalFormStore,
    config.path
  ) as InternalArrayStore;

  // Get current items of field array
  const items = untrack(() => internalArrayStore.items.value);

  // Continue if both indices are valid and different
  if (
    config.from >= 0 &&
    config.from <= items.length - 1 &&
    config.to >= 0 &&
    config.to <= items.length - 1 &&
    config.from !== config.to
  ) {
    batch(() => {
      // Move item ID in the items array
      const newItems = [...items];
      newItems.splice(config.to, 0, newItems.splice(config.from, 1)[0]);
      internalArrayStore.items.value = newItems;

      // Create temporary internal field store
      const tempInternalFieldStore = {} as InternalFieldStore;
      initializeFieldStore(
        tempInternalFieldStore,
        // @ts-expect-error
        internalArrayStore.schema.item,
        undefined,
        []
      );

      // Copy item state that gets overwritten to temporary store
      copyItemState(
        internalArrayStore.children[
          config.from < config.to ? config.from : config.to
        ],
        tempInternalFieldStore
      );

      if (config.from < config.to) {
        // Move child stores between 'from' and 'to' one index down
        for (let index = config.from; index < config.to; index++) {
          copyItemState(
            internalArrayStore.children[index + 1],
            internalArrayStore.children[index]
          );
        }
      } else {
        // Move child stores between 'to' and 'from' one index up
        for (let index = config.from; index > config.to; index--) {
          copyItemState(
            internalArrayStore.children[index - 1],
            internalArrayStore.children[index]
          );
        }
      }

      // Copy item state from temporary store to new position
      copyItemState(
        tempInternalFieldStore,
        internalArrayStore.children[
          config.from < config.to ? config.to : config.from
        ]
      );

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
