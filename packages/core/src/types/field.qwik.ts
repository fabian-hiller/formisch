import type { NoSerialize } from '@qwik.dev/core';
import type { FieldElement } from './field.ts';
import type { Schema } from './schema.ts';
import type { Signal } from './signal.ts';

export interface InternalBaseStore {
  kind: 'array' | 'object' | 'value';
  name: string;
  schema: NoSerialize<Schema>;
  elements: FieldElement[];
  errors: Signal<[string, ...string[]] | null>;
}

export interface InternalArrayStore extends InternalBaseStore {
  kind: 'array';
  children: InternalFieldStore[];

  initialItems: Signal<string[]>;
  startItems: Signal<string[]>;
  items: Signal<string[]>;

  isTouched: Signal<boolean>;
  isDirty: Signal<boolean>;
}

export interface InternalObjectStore extends InternalBaseStore {
  kind: 'object';
  children: Record<string, InternalFieldStore>;
}

export interface InternalValueStore extends InternalBaseStore {
  kind: 'value';

  // Hint: The initial value is used for resetting and may only be changed
  // during this process. It does not move when a field is moved. The start
  // value, on the other hand, is used to determine whether the field is dirty
  // and moves with it.
  initialInput: Signal<unknown>;
  startInput: Signal<unknown>;
  input: Signal<unknown>;

  isTouched: Signal<boolean>;
  isDirty: Signal<boolean>;
}

export type InternalFieldStore =
  | InternalArrayStore
  | InternalObjectStore
  | InternalValueStore;

export { FieldElement };
