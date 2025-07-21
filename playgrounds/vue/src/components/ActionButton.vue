<script setup lang="ts">
import UnstyledButton, { type DefaultButtonProps } from './UnstyledButton.vue';

type ActionButtonProps = DefaultButtonProps & {
  variant: 'primary' | 'secondary';
  label: string;
};

const props = defineProps<ActionButtonProps>();
</script>

<template>
  <UnstyledButton
    v-bind="props"
    :class="[
      'relative flex cursor-pointer items-center justify-center rounded-2xl px-5 py-2.5 font-medium no-underline transition-colors md:text-lg lg:rounded-2xl lg:px-6 lg:py-3 lg:text-xl',
      props.variant === 'primary' &&
        'bg-sky-600 text-white hover:bg-sky-600/80 dark:bg-sky-400 dark:text-gray-900 dark:hover:bg-sky-400/80',
      props.variant === 'secondary' &&
        'bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20',
    ]"
  >
    {{ label }}
  </UnstyledButton>
</template>
