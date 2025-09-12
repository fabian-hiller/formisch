<script lang="ts">
  import Expandable from './Expandable.svelte';

  interface Props {
    name: string;
    errors: [string, ...string[]] | null;
  }

  let { name, errors }: Props = $props();

  // Use frozen error signal
  let frozenErrors: [string, ...string[]] | null = $state(null);

  // Freeze error while element collapses to prevent UI from jumping
  $effect(() => {
    if (errors) {
      frozenErrors = errors;
    } else {
      const timeout = setTimeout(() => {
        frozenErrors = null;
      }, 200);

      return () => clearTimeout(timeout);
    }
  });
</script>

<Expandable expanded={!!errors}>
  <div
    id={`${name}-error`}
    class="pt-4 text-sm text-red-500 md:text-base lg:pt-5 lg:text-lg dark:text-red-400"
  >
    {frozenErrors?.[0]}
  </div>
</Expandable>
