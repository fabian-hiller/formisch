<script setup lang="ts">
import { onWatcherCleanup, shallowRef, watch } from 'vue';
import Expandable from './Expandable.vue';

interface InputErrorProps {
  name: string;
  errors: [string, ...string[]] | null;
}

const props = defineProps<InputErrorProps>();

// Use frozen error signal
const frozenErrors = shallowRef<[string, ...string[]] | null>(null);

// Freeze error while element collapses to prevent UI from jumping
watch(
  () => props.errors,
  (nextErrors) => {
    if (nextErrors) {
      frozenErrors.value = nextErrors;
    } else {
      const timeout = setTimeout(() => {
        frozenErrors.value = null;
      }, 200);
      onWatcherCleanup(() => clearTimeout(timeout));
    }
  }
);
</script>

<template>
  <Expandable :expanded="!!errors">
    <div
      :id="`${name}-error`"
      class="pt-4 text-sm text-red-500 md:text-base lg:pt-5 lg:text-lg dark:text-red-400"
    >
      {{ frozenErrors?.[0] }}
    </div>
  </Expandable>
</template>
