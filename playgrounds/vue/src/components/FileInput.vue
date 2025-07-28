<script setup lang="ts">
import type { FieldElementProps } from '@formisch/vue';
import { computed } from 'vue';
import InputErrors from './InputErrors.vue';
import InputLabel from './InputLabel.vue';

interface FileInputProps {
  class?: string;
  label?: string;
  accept?: string;
  required?: boolean;
  multiple?: boolean;
  errors: [string, ...string[]] | null;
  props: FieldElementProps;
}

const props = defineProps<FileInputProps>();
const model = defineModel<File | File[] | null | undefined>({ required: true });

const files = computed(() =>
  model.value ? (Array.isArray(model.value) ? model.value : [model.value]) : []
);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    if (props.multiple) {
      model.value = Array.from(target.files);
    } else {
      model.value = target.files[0];
    }
  } else {
    model.value = undefined;
  }
};
</script>

<template>
  <div :class="['px-8 lg:px-10', props.class]">
    <InputLabel :name="props.props.name" :label="label" :required="required" />
    <label
      :class="[
        'relative flex min-h-[96px] w-full items-center justify-center rounded-2xl border-[3px] border-dashed border-slate-200 p-8 text-center focus-within:border-sky-600/50 hover:border-slate-300 md:min-h-[112px] md:text-lg lg:min-h-[128px] lg:p-10 lg:text-xl dark:border-slate-800 dark:focus-within:border-sky-400/50 dark:hover:border-slate-700',
        !files?.length && 'text-slate-500',
      ]"
    >
      {{
        files?.length
          ? `Selected file${multiple ? 's' : ''}: ${files
              .map((file) => file?.name)
              .join(', ')}`
          : `Click or drag and drop file${multiple ? 's' : ''}`
      }}
      <input
        v-bind="props.props"
        @input="handleInput"
        :id="props.props.name"
        class="absolute h-full w-full cursor-pointer opacity-0"
        :accept="accept"
        :required="required"
        :multiple="multiple"
        :aria-invalid="!!errors"
        :aria-errormessage="`${props.props.name}-error`"
        type="file"
      />
    </label>
    <InputErrors :name="props.props.name" :errors="errors" />
  </div>
</template>
