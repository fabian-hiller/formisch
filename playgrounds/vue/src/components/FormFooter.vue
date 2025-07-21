<script setup lang="ts">
import { type FormStore, reset } from '@formisch/vue';
import ActionButton from './ActionButton.vue';

interface Props {
  of: FormStore;
}

const props = defineProps<Props>();

const handleReset = () => {
  reset(props.of);
};
</script>

<template>
  <footer class="flex space-x-6 px-8 md:space-x-8 lg:hidden">
    <ActionButton variant="primary" label="Submit" type="submit" />
    <ActionButton
      variant="secondary"
      label="Reset"
      type="button"
      @click="handleReset"
    />
  </footer>
</template>
