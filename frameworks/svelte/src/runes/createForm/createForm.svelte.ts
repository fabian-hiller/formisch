import {
  createFormStore,
  type FormConfig,
  getFieldBool,
  INTERNAL,
  type Schema,
  validateFormInput,
} from '@formisch/core/svelte';
import { onMount } from 'svelte';
import * as v from 'valibot';
import type { FormStore } from '../../types/index.ts';

export function createForm<TSchema extends Schema>(
  config: FormConfig<TSchema>
): FormStore<TSchema>;
export function createForm(config: FormConfig): FormStore {
  const internalFormStore = createFormStore(config, (input: unknown) =>
    v.safeParseAsync(config.schema, input)
  );

  onMount(async () => {
    if (config.validate === 'initial') {
      await validateFormInput(internalFormStore);
    }
  });

  const isTouched = $derived(getFieldBool(internalFormStore, 'isTouched'));
  const isDirty = $derived(getFieldBool(internalFormStore, 'isDirty'));
  const isValid = $derived(!getFieldBool(internalFormStore, 'errors'));

  return {
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
      return isTouched;
    },
    get isDirty() {
      return isDirty;
    },
    get isValid() {
      return isValid;
    },
    get errors() {
      return internalFormStore.errors.value;
    },
  };
}
