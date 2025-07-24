<script setup lang="ts" generic="TSchema extends Schema = Schema">
import {
  INTERNAL,
  Schema,
  SubmitHandler,
  validateFormInput,
} from '@formisch/core/vue';
import { FormStore } from '../../types';

export type FormProps<TSchema extends Schema = Schema> = {
  of: FormStore<TSchema>;
  onSubmit: SubmitHandler<TSchema>;
};

const props = defineProps<FormProps<TSchema>>();

async function handleSubmit(event: Event) {
  event.preventDefault();
  // Get internal form store
  const internalFormStore = props.of[INTERNAL];

  // Update submit state of form
  internalFormStore.isSubmitted.value = true;
  internalFormStore.isSubmitting.value = true;

  // Try to run submit actions if form is valid
  try {
    const result = await validateFormInput(internalFormStore, {
      shouldFocus: true,
    });
    if (result.success) {
      await props.onSubmit(result.output, event as SubmitEvent);
    }

    // If an error occurred, set form errors
  } catch (error) {
    internalFormStore.errors.value = [
      error instanceof Error ? error.message : 'An unknown error has occurred.',
    ];

    // Finally set submitting back to "false"
  } finally {
    internalFormStore.isSubmitting.value = false;
  }
}
</script>

<template>
  <form novalidate @submit="handleSubmit">
    <slot></slot>
  </form>
</template>
