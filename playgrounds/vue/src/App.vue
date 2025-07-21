<script setup lang="ts">
import { Tabs } from '@/components';
import { useEventListener } from '@/hooks';
import { disableTransitions } from '@/utils';
import { RouterView } from 'vue-router';
import './global.css';

useEventListener('resize', disableTransitions);
</script>

<template>
  <Tabs :items="['Login', 'Payment', 'Todos', 'Special', 'Nested']" />
  <main>
    <RouterView />
  </main>
</template>
