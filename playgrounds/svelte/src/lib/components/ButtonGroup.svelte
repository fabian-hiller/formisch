<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div class={['flex flex-wrap gap-6 px-8 lg:gap-8 lg:px-10', className]}>
  {@render children()}
</div>
