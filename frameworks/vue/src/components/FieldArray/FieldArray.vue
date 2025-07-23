<script
  setup
  lang="ts"
  generic="TSchema extends Schema, TFieldArrayPath extends RequiredPath"
>
import { RequiredPath, Schema, ValidArrayPath } from '@formisch/core/vue';
import * as v from 'valibot';
import { toRef } from 'vue';
import { useFieldArray } from '../../composables';
import { FieldArrayStore, FormStore } from '../../types';

/**
 * Properties of the `FieldArray` component.
 */
export interface FieldArrayProps<
  TSchema extends Schema = Schema,
  TFieldArrayPath extends RequiredPath = RequiredPath,
> {
  readonly of: FormStore<TSchema>;
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
}

const props = defineProps<FieldArrayProps<TSchema, TFieldArrayPath>>();
defineSlots<{
  default(props: FieldArrayStore<TSchema, TFieldArrayPath>): any;
}>();

const field = useFieldArray(props.of, { path: toRef(() => props.path) });
</script>

<template>
  <slot v-bind="field"></slot>
</template>
