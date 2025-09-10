<script setup lang="ts">
import { useEventListener } from '@/hooks';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

interface TabsProps {
  items: string[];
}

defineProps<TabsProps>();

// Use route
const route = useRoute();

// Use navigation element and indicator style signal
const navElement = ref<HTMLElement | null>(null);
const indicatorStyle = ref<{
  left: string;
  width: string;
}>();

/**
 * Updates the indicator style position.
 */
const updateIndicatorStyle = () => {
  if (!navElement.value) return;

  // Get active navigation element by pathname and href
  const activeElement = [...navElement.value.children].find(
    (e) => (e as HTMLAnchorElement).pathname === route.path
  ) as HTMLAnchorElement | undefined;

  // Update indicator style to active element or reset it to undefined
  indicatorStyle.value = activeElement
    ? {
        left: `${activeElement.offsetLeft || 0}px`,
        width: `${activeElement.offsetWidth || 0}px`,
      }
    : undefined;
};

// Update indicator style when active element changes
watch(
  () => route.path,
  () => setTimeout(updateIndicatorStyle)
);

// Update indicator style when window size change
useEventListener('resize', updateIndicatorStyle);

/**
 * Scrolls the current target into the view.
 */
const scrollIntoView = (event: Event) => {
  (event.currentTarget as HTMLAnchorElement).scrollIntoView({
    block: 'nearest',
    inline: 'center',
  });
};
</script>

<template>
  <div
    class="scrollbar-none flex scroll-px-8 overflow-x-auto scroll-smooth px-8"
  >
    <div
      class="relative flex-1 border-b-2 border-b-slate-200 dark:border-b-slate-800"
    >
      <nav class="flex space-x-8 lg:space-x-14" ref="navElement">
        <template v-for="item in items" :key="item">
          <RouterLink
            :class="[
              'block pb-4 lg:text-lg',
              `/${item.toLowerCase().replace(/ /g, '-')}` === route.path
                ? 'text-sky-600 dark:text-sky-400'
                : 'hover:text-slate-900 dark:hover:text-slate-200',
            ]"
            :to="`../${item.toLowerCase().replace(/ /g, '-')}`"
            @click="scrollIntoView"
          >
            {{ item }}
          </RouterLink>
        </template>
      </nav>
      <div
        class="absolute -bottom-0.5 m-0 h-0.5 rounded bg-sky-600 duration-200 dark:bg-sky-400"
        :style="indicatorStyle"
      />
    </div>
  </div>
</template>
