<script setup lang="ts">
import { shallowRef } from 'vue';
import Spinner from './Spinner.vue';

type LinkProps = {
  type: 'link';
  href?: string;
  download?: boolean | string;
  target?: '_blank';
  ariaLabel?: string;
};

type ButtonProps = {
  type: 'button' | 'reset' | 'submit';
  onClick?: () => unknown;
  loading?: boolean;
  form?: string;
  ariaLabel?: string;
};

export type DefaultButtonProps = LinkProps | ButtonProps;

const props = defineProps<DefaultButtonProps>();

const isLoading = shallowRef(false);

const handleClick = async () => {
  if (props.type !== 'link' && (props as ButtonProps).onClick) {
    isLoading.value = true;
    try {
      await (props as ButtonProps).onClick!();
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<template>
  <a
    v-if="props.type === 'link'"
    :href="props.href"
    :download="props.download"
    :target="props.target"
    :rel="props.target === '_blank' ? 'noreferrer' : undefined"
    :aria-label="props.ariaLabel"
  >
    <slot />
  </a>
  <button
    v-else
    :type="props.type"
    :disabled="isLoading || props.loading"
    :form="props.form"
    :aria-label="props.ariaLabel"
    @click="handleClick"
  >
    <span
      :class="[
        'transition-[opacity,transform,visibility] duration-200',
        {
          'invisible translate-x-5 opacity-0': isLoading || props.loading,
          'visible delay-300': !(isLoading || props.loading),
        },
      ]"
    >
      <slot />
    </span>
    <span
      :class="[
        'absolute duration-200',
        {
          'visible delay-300': isLoading || props.loading,
          'invisible -translate-x-5 opacity-0': !(isLoading || props.loading),
        },
      ]"
    >
      <Spinner />
    </span>
  </button>
</template>
