import type { Schema } from './schema.ts';
import type { Signal } from './signal.ts';

/**
 * Value type of the field element.
 */
export type FieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export interface InternalBaseStore {
  kind: 'array' | 'object' | 'value';
  name: string;
  schema: Schema;
  initialElements: FieldElement[];
  elements: FieldElement[];
  errors: Signal<[string, ...string[]] | null>;
  isTouched: Signal<boolean>;
  isDirty: Signal<boolean>;
}

export interface InternalArrayStore extends InternalBaseStore {
  kind: 'array';
  children: InternalFieldStore[];

  // Hint: The initial input is used for resetting and may only be changed
  // during this process. It does not move when a field is moved. The start
  // input, on the other hand, is used to determine whether the field is dirty
  // and moves with it.
  // Hint: The input indicates whether it is `null`, `undefined`, or found in
  // the children.
  initialInput: Signal<true | null | undefined>;
  startInput: Signal<true | null | undefined>;
  input: Signal<true | null | undefined>;

  // Hint: The initial items are used for resetting and may only be changed
  // during this process. It does not move when a field is moved. The start
  // items, on the other hand, is used to determine whether the field is dirty
  // and moves with it.
  initialItems: Signal<string[]>;
  startItems: Signal<string[]>;
  items: Signal<string[]>;
}

export interface InternalObjectStore extends InternalBaseStore {
  kind: 'object';
  children: Record<string, InternalFieldStore>;

  // Hint: The initial input is used for resetting and may only be changed
  // during this process. It does not move when a field is moved. The start
  // input, on the other hand, is used to determine whether the field is dirty
  // and moves with it.
  // Hint: The input indicates whether it is `null`, `undefined`, or found in
  // the children.
  initialInput: Signal<true | null | undefined>;
  startInput: Signal<true | null | undefined>;
  input: Signal<true | null | undefined>;
}

export interface InternalValueStore extends InternalBaseStore {
  kind: 'value';

  // Hint: The initial input is used for resetting and may only be changed
  // during this process. It does not move when a field is moved. The start
  // input, on the other hand, is used to determine whether the field is dirty
  // and moves with it.
  initialInput: Signal<unknown>;
  startInput: Signal<unknown>;
  input: Signal<unknown>;
}

export type InternalFieldStore =
  | InternalArrayStore
  | InternalObjectStore
  | InternalValueStore;
