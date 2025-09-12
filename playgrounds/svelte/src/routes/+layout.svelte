<script lang="ts">
  import { Tabs } from '$lib/components';
  import { disableTransitions, useEventListener } from '$lib/utils';
  import '../global.css';

  let { children } = $props();

  useEventListener('resize', disableTransitions);
</script>

<Tabs items={['Login', 'Payment', 'Todos', 'Special', 'Nested']} />

<main>{@render children()}</main>
