<script setup lang="ts">
import type { FieldElementProps } from '@formisch/vue';
import { computed } from 'vue';
import AngleDownIcon from '../icons/AngleDownIcon.vue';
import InputErrors from './InputErrors.vue';
import InputLabel from './InputLabel.vue';

interface SelectProps {
  class?: string;
  label?: string;
  options: { label: string; value: string }[];
  multiple?: boolean;
  size?: number;
  placeholder?: string;
  required?: boolean;
  input: string | string[] | null | undefined;
  errors: [string, ...string[]] | null;
  props: FieldElementProps;
}

const props = defineProps<SelectProps>();

// Create computed value of selected values
const values = computed(() =>
  Array.isArray(props.input)
    ? props.input
    : props.input && typeof props.input === 'string'
      ? [props.input]
      : []
);
</script>

<template>
  <div :class="['px-8 lg:px-10', props.class]">
    <InputLabel :name="props.props.name" :label="label" :required="required" />
    <div class="relative flex items-center">
      <select
        v-bind="props.props"
        :id="props.props.name"
        :class="[
          'w-full appearance-none space-y-2 rounded-2xl border-2 bg-transparent px-5 outline-none md:text-lg lg:space-y-3 lg:px-6 lg:text-xl',
          errors
            ? 'border-red-600/50 dark:border-red-400/50'
            : 'border-slate-200 hover:border-slate-300 focus:border-sky-600/50 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-sky-400/50',
          multiple ? 'py-5' : 'h-14 md:h-16 lg:h-[70px]',
          placeholder && !values?.length && 'text-slate-500',
        ]"
        :multiple="multiple"
        :size="size"
        :required="required"
        :aria-invalid="!!errors"
        :aria-errormessage="`${props.props.name}-error`"
      >
        <option value="" disabled hidden :selected="!input">
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="values?.includes(option.value)"
        >
          {{ option.label }}
        </option>
      </select>
      <AngleDownIcon
        v-if="!multiple"
        class="pointer-events-none absolute right-6 h-5 lg:right-8 lg:h-6"
      />
    </div>
    <InputErrors :name="props.props.name" :errors="errors" />
  </div>
</template>
