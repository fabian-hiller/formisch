import {
  INTERNAL,
  type Schema,
  type SubmitHandler,
} from '@formisch/core/preact';
import { handleSubmit } from '@formisch/methods/preact';
import type { JSX } from 'preact';
import type { FormStore } from '../../types/index.ts';

export type FormProps<TSchema extends Schema = Schema> = Omit<
  JSX.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  of: FormStore<TSchema>;
  onSubmit: SubmitHandler<TSchema>;
};

export function Form<TSchema extends Schema>(
  props: FormProps<TSchema>
): JSX.Element;
export function Form({ of, onSubmit, ...other }: FormProps): JSX.Element {
  return (
    <form
      {...other}
      novalidate
      ref={(element) => {
        of[INTERNAL].element = element;
      }}
      onSubmit={handleSubmit(of, onSubmit)}
    />
  );
}
