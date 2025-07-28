<script setup lang="ts">
import type { FieldElementProps } from '@formisch/vue';
import InputErrors from './InputErrors.vue';
import InputLabel from './InputLabel.vue';

interface TextInputProps {
  class?: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date';
  label?: string;
  placeholder?: string;
  required?: boolean;
  errors: [string, ...string[]] | null;
  props: FieldElementProps;
}

const props = defineProps<TextInputProps>();
const model = defineModel<string | number | undefined>({ required: true });
</script>

<template>
  <div :class="['px-8 lg:px-10', props.class]">
    <InputLabel :name="props.props.name" :label="label" :required="required" />
    <input
      v-model="model"
      v-bind="props.props"
      :id="props.props.name"
      :class="[
        'h-14 w-full rounded-2xl border-2 bg-white px-5 outline-none placeholder:text-slate-500 md:h-16 md:text-lg lg:h-[70px] lg:px-6 lg:text-xl dark:bg-gray-900',
        props.errors
          ? 'border-red-600/50 dark:border-red-400/50'
          : 'border-slate-200 hover:border-slate-300 focus:border-sky-600/50 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-sky-400/50',
      ]"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :aria-invalid="!!errors"
      :aria-errormessage="`${props.props.name}-error`"
    />
    <InputErrors :name="props.props.name" :errors="errors" />
  </div>
</template>
