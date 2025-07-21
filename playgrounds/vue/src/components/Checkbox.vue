<script setup lang="ts">
import type { FieldElementProps } from '@formisch/vue';
import InputErrors from './InputErrors.vue';

interface CheckboxProps {
  class?: string;
  label?: string;
  value?: string;
  input: boolean | undefined;
  required?: boolean;
  errors: [string, ...string[]] | null;
  props: FieldElementProps;
}

const props = defineProps<CheckboxProps>();
</script>

<template>
  <div :class="['px-8 lg:px-10', props.class]">
    <label class="flex select-none space-x-4 font-medium md:text-lg lg:text-xl">
      <input
        v-bind="props.props"
        :id="props.props.name"
        class="mt-1 h-4 w-4 cursor-pointer lg:mt-1 lg:h-5 lg:w-5"
        :value="value"
        :checked="input"
        :required="required"
        :aria-invalid="!!errors"
        :aria-errormessage="`${props.props.name}-error`"
        type="checkbox"
      />
      <span>{{ label }}</span>
      <span v-if="required" class="ml-1 text-red-600 dark:text-red-400">*</span>
    </label>
    <InputErrors :name="props.props.name" :errors="errors" />
  </div>
</template>
