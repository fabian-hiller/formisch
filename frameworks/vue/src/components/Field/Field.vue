<script
  setup
  lang="ts"
  generic="TSchema extends Schema, TFieldPath extends RequiredPath"
>
import { RequiredPath, Schema, ValidPath } from '@formisch/core/vue';
import * as v from 'valibot';
import { useField } from '../../composables';
import { FieldStore, FormStore } from '../../types';

/**
 * Field component props interface.
 */
export interface FieldProps<
  TSchema extends Schema = Schema,
  TFieldPath extends RequiredPath = RequiredPath,
> {
  /**
   * The form store to which the field belongs.
   */
  readonly of: FormStore<TSchema>;
  /**
   * The path to the field within the form schema.
   */
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
}

defineOptions({ inheritAttrs: false });
defineSlots<{ default(props: FieldStore<TSchema, TFieldPath>): any }>();
const props = defineProps<FieldProps<TSchema, TFieldPath>>();

const field = useField(
  () => props.of,
  () => ({ path: props.path })
);
</script>

<template>
  <slot v-bind="field"></slot>
</template>
