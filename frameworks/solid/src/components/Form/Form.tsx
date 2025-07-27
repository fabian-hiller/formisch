import {
  INTERNAL,
  type Schema,
  type SubmitHandler,
} from '@formisch/core/solid';
import { handleSubmit } from '@formisch/methods/solid';
import { type JSX, splitProps } from 'solid-js';
import type { FormStore } from '../../types/index.ts';

export type FormProps<TSchema extends Schema = Schema> = Omit<
  JSX.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  of: FormStore<TSchema>;
  children: JSX.Element;
  onSubmit: SubmitHandler<TSchema>;
};

export function Form<TSchema extends Schema>(
  props: FormProps<TSchema>
): JSX.Element;
export function Form(props: FormProps): JSX.Element {
  // Split props between local, config and other
  const [, other] = splitProps(props, ['of', 'onSubmit']);

  return (
    <form
      {...other}
      novalidate
      ref={(element) => {
        props.of[INTERNAL].element = element;
      }}
      onSubmit={(event) => handleSubmit(props.of, props.onSubmit)(event)}
    />
  );
}
