<script lang="ts" generics="TSchema extends Schema = Schema">
  import {
    INTERNAL,
    type Schema,
    type SubmitHandler,
  } from '@formisch/core/svelte';
  import { handleSubmit } from '@formisch/methods/svelte';
  import type { FormStore } from '../../types/index.ts';
  import type { Snippet } from 'svelte';
  import type { HTMLFormAttributes } from 'svelte/elements';

  export type FormProps<TSchema extends Schema = Schema> = Omit<
    HTMLFormAttributes,
    'on:submit' | 'onsubmit'
  > & {
    of: FormStore<TSchema>;
    onSubmit: SubmitHandler<TSchema>;
    children: Snippet;
  };

  let { of, onSubmit, children, ...other }: FormProps<TSchema> = $props();

  const handler = handleSubmit(of, onSubmit);
</script>

<form {...other} novalidate onsubmit={handler} bind:this={of[INTERNAL].element}>
  {@render children()}
</form>
