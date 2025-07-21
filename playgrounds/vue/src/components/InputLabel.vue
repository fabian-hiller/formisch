<script setup lang="ts">
type InputLabelProps = {
  name?: string;
  label?: string;
  required?: boolean;
  margin?: 'none';
};

defineProps<InputLabelProps>();
</script>

<template>
  <component
    v-if="label"
    :is="name ? 'label' : 'div'"
    :class="[
      'inline-block font-medium md:text-lg lg:text-xl',
      { 'mb-4 lg:mb-5': !margin },
    ]"
    :for="name"
  >
    {{ label }}
    <span v-if="required" class="ml-1 text-red-600 dark:text-red-400">*</span>
  </component>
</template>
