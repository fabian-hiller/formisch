<script
  lang="ts"
  generics="TSchema extends Schema, TFieldArrayPath extends RequiredPath"
>
  import type {
    RequiredPath,
    Schema,
    ValidArrayPath,
  } from '@formisch/core/svelte';
  import type * as v from 'valibot';
  import { useFieldArray } from '../../runes/index.ts';
  import type { FieldArrayStore, FormStore } from '../../types/index.ts';
  import type { Snippet } from 'svelte';

  /**
   * Properties of the `FieldArray` component.
   */
  export interface FieldArrayProps<
    TSchema extends Schema = Schema,
    TFieldArrayPath extends RequiredPath = RequiredPath,
  > {
    readonly of: FormStore<TSchema>;
    readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
    readonly children: Snippet<[FieldArrayStore<TSchema, TFieldArrayPath>]>;
  }

  let { of, path, children }: FieldArrayProps<TSchema, TFieldArrayPath> =
    $props();

  const field = useFieldArray(
    () => of,
    () => ({ path })
  );
</script>

{@render children(field)}
