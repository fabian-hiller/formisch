import {
  type BaseFormStore,
  batch,
  type DeepPartial,
  getFieldStore,
  INTERNAL,
  type PathValue,
  type RequiredPath,
  type Schema,
  setInitialFieldInput,
  untrack,
  validateFormInput,
  type ValidPath,
  walkFieldStore,
} from '@formisch/core';
import type * as v from 'valibot';

interface ResetBaseConfig {
  readonly keepInput?: boolean | undefined;
  readonly keepTouched?: boolean | undefined;
  readonly keepErrors?: boolean | undefined;
}

export interface ResetFormConfig<TSchema extends Schema>
  extends ResetBaseConfig {
  readonly path?: undefined;
  readonly initialInput?: DeepPartial<v.InferInput<TSchema>> | undefined;
  readonly keepSubmitCount?: boolean | undefined;
  readonly keepSubmitted?: boolean | undefined;
}

export interface ResetFieldConfig<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
> extends ResetBaseConfig {
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  readonly initialInput?: DeepPartial<
    PathValue<v.InferInput<TSchema>, TFieldPath>
  >;
}

export function reset(form: BaseFormStore): void;
export function reset<
  TSchema extends Schema,
  TFieldPath extends RequiredPath | undefined = undefined,
>(
  form: BaseFormStore<TSchema>,
  config: TFieldPath extends RequiredPath
    ? ResetFieldConfig<TSchema, TFieldPath>
    : ResetFormConfig<TSchema>
): void;
export function reset(
  form: BaseFormStore,
  config?: ResetFormConfig<Schema> | ResetFieldConfig<Schema, RequiredPath>
): void {
  batch(() => {
    untrack(() => {
      // Get internal form and field store
      const internalFormStore = form[INTERNAL];
      const internalFieldStore = config?.path
        ? getFieldStore(internalFormStore, config.path)
        : internalFormStore;

      // If initial input is provided, set it
      if (config?.initialInput) {
        setInitialFieldInput(internalFieldStore, config.initialInput);
      }

      // Reset state of fields by walking field store
      walkFieldStore(internalFieldStore, (internalFieldStore) => {
        // Reset errors if it is not to be kept
        if (!config?.keepErrors) {
          internalFieldStore.errors.value = null;
        }

        // If it is an array, reset array specific state
        if (internalFieldStore.kind === 'array') {
          // Reset start items to initial items
          internalFieldStore.startItems.value =
            internalFieldStore.initialItems.value;

          // Reset items if it is not to be kept
          if (
            !config?.keepInput ||
            // Hint: The array items are just an internal concept used to
            // store and track changes. We reset anyway if the lengths are
            // equal because otherwise, the field may be in a dirty state
            // even though there is no visible change for the end user.
            internalFieldStore.startItems.value.length ===
              internalFieldStore.items.value.length
          ) {
            internalFieldStore.items.value =
              internalFieldStore.initialItems.value;
          }

          // Reset is touched if it is not to be kept
          if (!config?.keepTouched) {
            internalFieldStore.isTouched.value = false;
          }

          // Update is dirty to reflect changes
          internalFieldStore.isDirty.value =
            internalFieldStore.startItems.value !==
            internalFieldStore.items.value;

          // If it is a value, reset value specific state
        } else if (internalFieldStore.kind === 'value') {
          // Reset start input to initial input
          internalFieldStore.startInput.value =
            internalFieldStore.initialInput.value;

          // Reset input if it is not to be kept
          if (!config?.keepInput) {
            internalFieldStore.input.value =
              internalFieldStore.initialInput.value;
          }

          // Reset is touched if it is not to be kept
          if (!config?.keepTouched) {
            internalFieldStore.isTouched.value = false;
          }

          // Update is dirty to reflect changes
          internalFieldStore.isDirty.value =
            internalFieldStore.startInput.value !==
            internalFieldStore.input.value;

          // Reset file inputs as they can't be controlled
          for (const element of internalFieldStore.elements) {
            if (element.type === 'file') {
              element.value = '';
            }
          }
        }
      });

      // If path is not defined, reset form specific state
      if (!config?.path) {
        // Reset is submitted if it is not to be kept
        if (!config?.keepSubmitted) {
          internalFormStore.isSubmitted.value = false;
        }

        // Validate form input if configured
        if (internalFormStore.validateOn === 'initial') {
          validateFormInput(internalFormStore);
        }
      }
    });
  });
}
