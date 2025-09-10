<script lang="ts">
  import type { FormStore } from '@formisch/svelte';
  import Expandable from './Expandable.svelte';

  interface Props {
    of: FormStore;
    class?: string;
  }

  let { of: formStore, class: className }: Props = $props();

  // Use frozen error signal
  let frozenErrors: [string, ...string[]] | null = $state(null);

  // Freeze error while element collapses to prevent UI from jumping
  $effect(() => {
    if (formStore.errors) {
      frozenErrors = formStore.errors;
    } else {
      const timeout = setTimeout(() => {
        frozenErrors = null;
      }, 200);

      return () => clearTimeout(timeout);
    }
  });
</script>

<Expandable expanded={!!formStore.errors}>
  <div
    class={[
      'px-8 text-red-500 md:text-lg lg:px-10 lg:text-xl dark:text-red-400',
      className,
    ]}
  >
    {frozenErrors?.[0]}
  </div>
</Expandable>
