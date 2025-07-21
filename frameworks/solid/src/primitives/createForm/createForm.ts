import {
  createFormStore,
  type FormConfig,
  getFieldBool,
  INTERNAL,
  type Schema,
  validateFormInput,
} from '@formisch/core/solid';
import { createMemo } from 'solid-js';
import * as v from 'valibot';
import type { FormStore } from '../../types/index.ts';

export function createForm<TSchema extends Schema>(
  config: FormConfig<TSchema>
): FormStore<TSchema>;
export function createForm(config: FormConfig): FormStore {
  const internalFormStore = createFormStore(config, async (input: unknown) =>
    v.safeParseAsync(config.schema, input)
  );

  const getIsTouched = createMemo(() =>
    getFieldBool(internalFormStore, 'isTouched')
  );
  const getIsDirty = createMemo(() =>
    getFieldBool(internalFormStore, 'isDirty')
  );
  const getIsValid = createMemo(
    () => !getFieldBool(internalFormStore, 'errors')
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
      return getIsTouched();
    },
    get isDirty() {
      return getIsDirty();
    },
    get isValid() {
      return getIsValid();
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
