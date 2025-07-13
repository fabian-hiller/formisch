import {
  createFormStore,
  type FormConfig,
  getFieldBool,
  INTERNAL,
  type Schema,
  validateFormInput,
} from '@formisch/core/solid';
import * as v from 'valibot';
import type { FormStore } from '../../types/index.ts';

export function createForm<TSchema extends Schema>(
  config: FormConfig<TSchema>
): FormStore<TSchema>;
export function createForm(config: FormConfig): FormStore {
  const internalFormStore = createFormStore(config, async (input: unknown) =>
    v.safeParseAsync(config.schema, input)
  );

  const form = {
    [INTERNAL]: internalFormStore,
    get isSubmitting() {
      return internalFormStore.isSubmitting.value;
    },
    get isSubmitted() {
      return internalFormStore.isSubmitted.value;
    },
    get isValidating() {
      return internalFormStore.isValidating.value;
    },
    get isTouched() {
      return getFieldBool(internalFormStore, 'isTouched');
    },
    get isDirty() {
      return getFieldBool(internalFormStore, 'isDirty');
    },
    get isValid() {
      return !getFieldBool(internalFormStore, 'errors');
    },
    get errors() {
      return internalFormStore.errors.value;
    },
  };

  if (config.validateOn === 'initial') {
    validateFormInput(form[INTERNAL]);
  }

  return form;
}
