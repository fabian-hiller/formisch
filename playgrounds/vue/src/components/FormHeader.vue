<script setup lang="ts">
import { type FormStore, reset } from '@formisch/vue';
import ActionButton from './ActionButton.vue';

type FormHeaderProps = {
  of: FormStore;
  heading: string;
};

const props = defineProps<FormHeaderProps>();

const handleReset = () => {
  reset(props.of);
};
</script>

<template>
  <header class="flex items-center justify-between px-8 lg:px-10">
    <h1
      class="text-2xl text-slate-900 md:text-3xl lg:text-4xl dark:text-slate-200"
    >
      {{ props.heading }}
    </h1>
    <div class="hidden lg:flex lg:space-x-8">
      <ActionButton
        variant="secondary"
        label="Reset"
        type="button"
        @click="handleReset"
      />
      <ActionButton variant="primary" label="Submit" type="submit" />
    </div>
  </header>
</template>
