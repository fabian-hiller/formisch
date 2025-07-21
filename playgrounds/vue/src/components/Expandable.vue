<script setup lang="ts">
import { useEventListener } from '@/hooks';
import { shallowRef, watch } from 'vue';

interface Props {
  class?: string;
  id?: string;
  expanded: boolean;
}

const props = defineProps<Props>();

// Use element and frozen children ref
const element = shallowRef<HTMLDivElement>();

// Updates the expandable element height
const updateElementHeight = () => {
  if (element.value) {
    element.value.style.height = `${
      props.expanded ? element.value.scrollHeight : 0
    }px`;
  }
};

// Expand or collapse content when expanded prop changes
watch(
  () => props.expanded,
  () => setTimeout(updateElementHeight)
);

// Update element height when window size changes
useEventListener('resize', () => {
  element.value!.style.maxHeight = '0';
  updateElementHeight();
  element.value!.style.maxHeight = '';
});
</script>

<template>
  <div
    ref="element"
    :class="[
      '!m-0 h-0 origin-top duration-200',
      !expanded && 'invisible -translate-y-2 scale-y-75 opacity-0',
      props.class,
    ]"
    :id="props.id"
    :aria-hidden="!expanded"
  >
    <slot />
  </div>
</template>
