import type * as v from 'valibot';
import type { INTERNAL } from '../values.ts';
import type { InternalObjectStore } from './field.ts';
import type { Schema } from './schema.ts';
import type { Signal } from './signal.ts';
import type { DeepPartial, MaybePromise } from './utils.ts';

/**
 * Value type of the validation mode.
 */
export type ValidationMode =
  | 'initial'
  | 'touch'
  | 'input'
  | 'change'
  | 'blur'
  | 'submit';

export interface FormConfig<TSchema extends Schema = Schema> {
  readonly schema: TSchema;
  readonly initialInput?: DeepPartial<v.InferInput<TSchema>> | undefined;
  readonly validate?: ValidationMode | undefined;
  readonly revalidate?: Exclude<ValidationMode, 'initial'> | undefined;
}

export interface InternalFormStore<TSchema extends Schema = Schema>
  extends InternalObjectStore {
  element?: HTMLFormElement;

  validators: number;
  validate: ValidationMode;
  revalidate: Exclude<ValidationMode, 'initial'>;
  parse: (input: unknown) => Promise<v.SafeParseResult<TSchema>>;

  isSubmitting: Signal<boolean>;
  isSubmitted: Signal<boolean>;
  isValidating: Signal<boolean>;
}

export interface BaseFormStore<TSchema extends Schema = Schema> {
  [INTERNAL]: InternalFormStore<TSchema>;
}

export type SubmitHandler<TSchema extends Schema> = (
  output: v.InferOutput<TSchema>,
  event: SubmitEvent
) => MaybePromise<unknown>;
