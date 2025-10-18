<script
  setup
  lang="ts"
  generic="TSchema extends Schema, TFieldArrayPath extends RequiredPath"
>
import { RequiredPath, Schema, ValidArrayPath } from '@formisch/core/vue';
import * as v from 'valibot';
import { useFieldArray } from '../../composables';
import { FieldArrayStore, FormStore } from '../../types';

/**
 * Field array component props interface.
 */
export interface FieldArrayProps<
  TSchema extends Schema = Schema,
  TFieldArrayPath extends RequiredPath = RequiredPath,
> {
  /**
   * The form store to which the field array belongs.
   */
  readonly of: FormStore<TSchema>;
  /**
   * The path to the field array within the form schema.
   */
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
}

defineOptions({ inheritAttrs: false });
defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default(props: FieldArrayStore<TSchema, TFieldArrayPath>): any;
}>();
const props = defineProps<FieldArrayProps<TSchema, TFieldArrayPath>>();

const field = useFieldArray(
  () => props.of,
  () => ({ path: props.path })
);
</script>

<template>
  <slot v-bind="field"></slot>
</template>
