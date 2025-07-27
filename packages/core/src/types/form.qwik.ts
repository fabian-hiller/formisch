import type { QRL } from '@qwik.dev/core';
import type * as v from 'valibot';
import type { INTERNAL } from '../values.ts';
import type { InternalObjectStore } from './field.qwik.ts';
import type { SubmitHandler, ValidationMode } from './form.ts';
import type { Schema } from './schema.ts';
import type { Signal } from './signal.ts';
import type { DeepPartial } from './utils.ts';

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
  parse: QRL<(input: unknown) => Promise<v.SafeParseResult<TSchema>>>;

  isSubmitting: Signal<boolean>;
  isSubmitted: Signal<boolean>;
  isValidating: Signal<boolean>;
}

export interface BaseFormStore<TSchema extends Schema = Schema> {
  [INTERNAL]: InternalFormStore<TSchema>;
}

export { ValidationMode, SubmitHandler };
