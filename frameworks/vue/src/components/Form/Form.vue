<script setup lang="ts" generic="TSchema extends Schema = Schema">
import { Schema, SubmitHandler } from '@formisch/core/vue';
import { handleSubmit } from '@formisch/methods/vue';
import { FormStore } from '../../types';

export interface FormProps<TSchema extends Schema = Schema> {
  of: FormStore<TSchema>;
  onSubmit: SubmitHandler<TSchema>;
}

const props = defineProps<FormProps<TSchema>>();

const handler = handleSubmit(props.of, props.onSubmit) as (
  event: Event
) => void;
</script>

<template>
  <form novalidate @submit="handler">
    <slot></slot>
  </form>
</template>
