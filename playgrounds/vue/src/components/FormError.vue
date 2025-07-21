<script setup lang="ts">
import type { FormStore } from '@formisch/vue';
import { onWatcherCleanup, shallowRef, watch } from 'vue';
import Expandable from './Expandable.vue';

interface Props {
  of: FormStore;
  class?: string;
}

const props = defineProps<Props>();

// Use frozen error signal
const frozenErrors = shallowRef<[string, ...string[]] | null>(null);

// Freeze error while element collapses to prevent UI from jumping
watch(
  () => props.of.errors,
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
  <Expandable :expanded="!!of.errors">
    <div
      :class="[
        'px-8 text-red-500 md:text-lg lg:px-10 lg:text-xl dark:text-red-400',
        props.class,
      ]"
    >
      {{ frozenErrors?.[0] }}
    </div>
  </Expandable>
</template>
