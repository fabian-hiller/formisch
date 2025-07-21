<script setup lang="ts">
type ButtonGroupProps = {
  class?: string;
};

const props = defineProps<ButtonGroupProps>();
</script>

<template>
  <div :class="['flex flex-wrap gap-6 px-8 lg:gap-8 lg:px-10', props.class]">
    <slot />
  </div>
</template>
