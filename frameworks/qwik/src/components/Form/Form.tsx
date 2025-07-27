import { INTERNAL, type Schema, type SubmitHandler } from '@formisch/core/qwik';
import { handleSubmit } from '@formisch/methods/qwik';
import { component$, JSXOutput, PropsOf, QRL, Slot } from '@qwik.dev/core';
import type { FormStore } from '../../types/index.ts';

export type FormProps<TSchema extends Schema = Schema> = Omit<
  PropsOf<'form'>,
  'onSubmit$'
> & {
  of: FormStore<TSchema>;
  onSubmit$: QRL<SubmitHandler<TSchema>>;
};

export const Form = component$(
  <TSchema extends Schema>({
    of,
    onSubmit$,
    ...other
  }: FormProps<TSchema>): JSXOutput => {
    return (
      <form
        {...other}
        noValidate
        preventdefault:submit
        ref={(element) => {
          of[INTERNAL].element = element;
        }}
        onSubmit$={(event) => handleSubmit(of, onSubmit$)(event)}
      >
        <Slot />
      </form>
    );
  }
);
