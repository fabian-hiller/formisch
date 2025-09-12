<script
  lang="ts"
  generics="TSchema extends Schema, TFieldPath extends RequiredPath"
>
  import type { RequiredPath, Schema, ValidPath } from '@formisch/core/svelte';
  import type * as v from 'valibot';
  import { useField } from '../../runes/index.ts';
  import type { FieldStore, FormStore } from '../../types/index.ts';
  import type { Snippet } from 'svelte';

  /**
   * Properties of the `Field` component.
   */
  export interface FieldProps<
    TSchema extends Schema = Schema,
    TFieldPath extends RequiredPath = RequiredPath,
  > {
    readonly of: FormStore<TSchema>;
    readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
    readonly children: Snippet<[FieldStore<TSchema, TFieldPath>]>;
  }

  let { of, path, children }: FieldProps<TSchema, TFieldPath> = $props();

  const field = useField(
    () => of,
    () => ({ path })
  );
</script>

{@render children(field)}
