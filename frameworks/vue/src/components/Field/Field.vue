<script lang="ts">
import { RequiredPath, Schema, ValidPath } from '@formisch/core/vue';
import * as v from 'valibot';
import { toRef } from 'vue';
import { useField } from '../../composables';
import { FieldStore, FormStore } from '../../types';

/**
 * Properties of the `Field` component.
 */
export interface FieldProps<
  TSchema extends Schema = Schema,
  TFieldPath extends RequiredPath = RequiredPath,
> {
  readonly of: FormStore<TSchema>;
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
}
</script>

<script
  setup
  lang="ts"
  generic="TSchema extends Schema, TFieldPath extends RequiredPath"
>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<FieldProps<TSchema, TFieldPath>>();
defineSlots<{
  default(props: FieldStore<TSchema, TFieldPath>): any;
}>();

const field = useField(props.of, { path: toRef(() => props.path) });
</script>

<template>
  <slot v-bind="field"></slot>
</template>
