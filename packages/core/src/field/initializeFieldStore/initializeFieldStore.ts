import * as v from 'valibot';
import { createId, createSignal, framework } from '../../framework/index.ts';
import type { InternalFieldStore, PathKey } from '../../types/index.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FieldSchema =
  | v.ArraySchema<
      v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
      v.ErrorMessage<v.ArrayIssue> | undefined
    >
  | v.ExactOptionalSchema<any, any>
  | v.IntersectSchema<any, any>
  | v.LazySchema<any>
  | v.LooseObjectSchema<any, any>
  | v.LooseTupleSchema<any, any>
  | v.NonNullableSchema<any, any>
  | v.NonNullishSchema<any, any>
  | v.NonOptionalSchema<any, any>
  | v.NullableSchema<any, any>
  | v.NullishSchema<any, any>
  | v.ObjectSchema<v.ObjectEntries, v.ErrorMessage<v.ObjectIssue> | undefined>
  | v.ObjectWithRestSchema<
      v.ObjectEntries,
      v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
      v.ErrorMessage<v.ObjectWithRestIssue> | undefined
    >
  | v.OptionalSchema<any, any>
  | v.PromiseSchema<any>
  | v.RecordSchema<any, any, any>
  | v.StrictObjectSchema<any, any>
  | v.StrictTupleSchema<any, any>
  | v.TupleSchema<v.TupleItems, v.ErrorMessage<v.TupleIssue> | undefined>
  | v.TupleWithRestSchema<any, any, any>
  | v.UndefinedableSchema<any, any>
  | v.UnionSchema<any, any>
  | v.VariantSchema<any, any, any>;

/**
 * TODO: Add comment
 * TODO: Should this stay in /primitives or move to /utils?
 */
export function initializeFieldStore(
  internalFieldStore: Partial<InternalFieldStore>,
  schema: FieldSchema,
  initialInput: unknown,
  path: PathKey[]
): void {
  // Throw error for unsupported schemas
  if (
    (framework === 'qwik' && schema.type === 'lazy') ||
    schema.type === 'object_with_rest' ||
    schema.type === 'record' ||
    schema.type === 'tuple_with_rest' ||
    schema.type === 'promise'
  ) {
    throw new Error(`"${schema.type}" schema is not supported`);

    // Handle lazy schemas
  } else if (schema.type === 'lazy') {
    initializeFieldStore(
      internalFieldStore,
      schema.getter(undefined),
      initialInput,
      path
    );

    // Handle wrapped schemas
  } else if (
    schema.type === 'exact_optional' ||
    schema.type === 'non_nullable' ||
    schema.type === 'non_nullish' ||
    schema.type === 'non_optional' ||
    schema.type === 'nullable' ||
    schema.type === 'nullish' ||
    schema.type === 'optional' ||
    schema.type === 'undefinedable'
  ) {
    initializeFieldStore(
      internalFieldStore,
      schema.wrapped,
      initialInput ?? v.getDefault(schema),
      path
    );

    // Handle schemas with options
  } else if (
    schema.type === 'intersect' ||
    schema.type === 'union' ||
    schema.type === 'variant'
  ) {
    for (const schemaOption of schema.options) {
      initializeFieldStore(
        internalFieldStore,
        schemaOption,
        initialInput,
        path
      );
    }

    // Handle supported schemas
  } else {
    internalFieldStore.schema = schema;
    internalFieldStore.name = JSON.stringify(path);
    internalFieldStore.elements = [];
    internalFieldStore.errors = createSignal(null);

    // Handle array schemas
    if (
      schema.type === 'array' ||
      schema.type === 'loose_tuple' ||
      schema.type === 'strict_tuple' ||
      schema.type === 'tuple'
    ) {
      if (internalFieldStore.kind && internalFieldStore.kind !== 'array') {
        throw new Error(
          `Store initialized as "${internalFieldStore.kind}" cannot be reinitialized as "array"`
        );
      }
      internalFieldStore.kind = 'array';
      if (internalFieldStore.kind === 'array') {
        internalFieldStore.children ??= [];

        if (schema.type === 'array') {
          if (initialInput) {
            for (
              let index = 0;
              // @ts-expect-error
              index < initialInput.length;
              index++
            ) {
              // @ts-expect-error
              internalFieldStore.children[index] = {};
              path.push(index);
              initializeFieldStore(
                internalFieldStore.children[index],
                schema.item as FieldSchema,
                // @ts-expect-error
                initialInput[index],
                path
              );
              path.pop();
            }
          }
        } else {
          for (let index = 0; index < schema.items; index++) {
            // @ts-expect-error
            internalFieldStore.children[index] = {};
            path.push(index);
            initializeFieldStore(
              internalFieldStore.children[index],
              schema.items[index] as FieldSchema,
              // @ts-expect-error
              initialInput?.[index],
              path
            );
            path.pop();
          }
        }
        const initialItems = internalFieldStore.children.map(createId);
        internalFieldStore.initialItems = createSignal(initialItems);
        internalFieldStore.startItems = createSignal(initialItems);
        internalFieldStore.items = createSignal(initialItems);
        internalFieldStore.isTouched = createSignal(false);
        internalFieldStore.isDirty = createSignal(false);
      }

      // Handle object schemas
    } else if (
      schema.type === 'loose_object' ||
      schema.type === 'object' ||
      schema.type === 'strict_object'
    ) {
      if (internalFieldStore.kind && internalFieldStore.kind !== 'object') {
        throw new Error(
          `Store initialized as "${internalFieldStore.kind}" cannot be reinitialized as "object"`
        );
      }
      internalFieldStore.kind = 'object';
      if (internalFieldStore.kind === 'object') {
        internalFieldStore.children ??= {};
        for (const key in schema.entries) {
          // @ts-expect-error
          internalFieldStore.children[key] = {};
          path.push(key);
          initializeFieldStore(
            internalFieldStore.children[key],
            schema.entries[key] as FieldSchema,
            // @ts-expect-error
            initialInput?.[key],
            path
          );
          path.pop();
        }
      }

      // Handle value schemas (leaf nodes)
    } else {
      internalFieldStore.kind = 'value';
      if (internalFieldStore.kind === 'value') {
        internalFieldStore.initialInput = createSignal(initialInput);
        internalFieldStore.startInput = createSignal(initialInput);
        internalFieldStore.input = createSignal(initialInput);
        internalFieldStore.isTouched = createSignal(false);
        internalFieldStore.isDirty = createSignal(false);
      }
    }
  }
}
