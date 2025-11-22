<script lang="ts">
  import { type FormStore, reset } from '@formisch/svelte';
  import ActionButton from './ActionButton.svelte';

  interface Props {
    of: FormStore;
    heading: string;
  }

  let { of: formStore, heading }: Props = $props();

  const handleReset = () => {
    reset(formStore);
  };
</script>

<header class="flex items-center justify-between px-8 lg:px-10">
  <h1
    class="text-2xl text-slate-900 md:text-3xl lg:text-4xl dark:text-slate-200"
  >
    {heading}
  </h1>
  <div class="hidden lg:flex lg:space-x-8">
    <ActionButton
      variant="secondary"
      label="Reset"
      type="button"
      onClick={handleReset}
    />
    <ActionButton variant="primary" label="Submit" type="submit" />
  </div>
</header>
