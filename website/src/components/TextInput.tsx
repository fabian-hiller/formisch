import {
  component$,
  type QRL,
  type ReadonlySignal,
  useSignal,
  useTask$,
} from '@qwik.dev/core';
import clsx from 'clsx';
import { InputErrors } from './InputErrors';
import { InputLabel } from './InputLabel';

type TextInputProps = {
  class?: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date';
  label?: string;
  placeholder?: string;
  required?: boolean;
  input: ReadonlySignal<string | number | undefined>;
  errors: ReadonlySignal<[string, ...string[]] | null>;
  ref: QRL<(element: HTMLInputElement) => void>;
  onFocus$: QRL<(event: FocusEvent, element: HTMLInputElement) => void>;
  onInput$: QRL<(event: InputEvent, element: HTMLInputElement) => void>;
  onChange$: QRL<(event: Event, element: HTMLInputElement) => void>;
  onBlur$: QRL<(event: FocusEvent, element: HTMLInputElement) => void>;
};

/**
 * Text input field that users can type into. Various decorations can be
 * displayed in or around the field to communicate the entry requirements.
 */
export const TextInput = component$(
  ({ label, input, errors, ...props }: TextInputProps) => {
    const { name, required } = props;
    const signal = useSignal<string | number>();
    useTask$(({ track }) => {
      if (!Number.isNaN(track(input))) {
        signal.value = input.value;
      }
    });
    return (
      <div class={clsx('px-8 lg:px-10', props.class)}>
        <InputLabel name={name} label={label} required={required} />
        <input
          {...props}
          class={clsx(
            'h-14 w-full rounded-2xl border-2 bg-white px-5 outline-none placeholder:text-slate-500 md:h-16 md:text-lg lg:h-[70px] lg:px-6 lg:text-xl dark:bg-gray-900',
            errors.value
              ? 'border-red-600/50 dark:border-red-400/50'
              : 'border-slate-200 hover:border-slate-300 focus:border-sky-600/50 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-sky-400/50'
          )}
          id={name}
          value={signal.value ?? ''}
          aria-invalid={!!errors.value}
          aria-errormessage={`${name}-error`}
        />
        <InputErrors name={name} errors={errors} />
      </div>
    );
  }
);
