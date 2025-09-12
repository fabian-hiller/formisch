<script lang="ts">
  interface Props {
    name?: string;
    label?: string;
    required?: boolean;
    margin?: 'none';
  }

  let { name, label, required, margin }: Props = $props();
</script>

{#if label}
  {#if name}
    <label
      class={[
        'inline-block font-medium md:text-lg lg:text-xl',
        {
          'mb-4 lg:mb-5': !margin,
        },
      ]}
      for={name}
    >
      {label}
      {#if required}
        <span class="ml-1 text-red-600 dark:text-red-400">*</span>
      {/if}
    </label>
  {:else}
    <div
      class={[
        'inline-block font-medium md:text-lg lg:text-xl',
        {
          'mb-4 lg:mb-5': !margin,
        },
      ]}
    >
      {label}
      {#if required}
        <span class="ml-1 text-red-600 dark:text-red-400">*</span>
      {/if}
    </div>
  {/if}
{/if}
