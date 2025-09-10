<script lang="ts">
  import { type FormStore, reset } from '@formisch/svelte';
  import ActionButton from './ActionButton.svelte';

  interface Props {
    of: FormStore;
  }

  let { of: formStore }: Props = $props();
</script>

<footer class="flex space-x-6 px-8 md:space-x-8 lg:hidden">
  <ActionButton variant="primary" label="Submit" type="submit" />
  <ActionButton
    variant="secondary"
    label="Reset"
    type="button"
    onClick={() => reset(formStore)}
  />
</footer>
