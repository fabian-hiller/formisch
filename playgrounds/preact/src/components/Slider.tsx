import { ReadonlySignal } from '@preact/signals';
import clsx from 'clsx';
import type { JSX } from 'preact';
import { forwardRef } from 'preact/compat';
import { InputErrors } from './InputErrors';
import { InputLabel } from './InputLabel';

type SliderProps = {
  class?: string;
  name: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  input: ReadonlySignal<string | number | undefined>;
  errors: ReadonlySignal<[string, ...string[]] | null>;
  ref: (element: HTMLInputElement) => void;
  onFocus: JSX.FocusEventHandler<HTMLInputElement>;
  onInput: JSX.InputEventHandler<HTMLInputElement>;
  onChange: JSX.GenericEventHandler<HTMLInputElement>;
  onBlur: JSX.FocusEventHandler<HTMLInputElement>;
};

/**
 * Range slider that allows users to select predefined numbers. Various
 * decorations can be displayed in or around the field to communicate the
 * entry requirements.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, input, errors, ...props }: SliderProps) => {
    const { name, required } = props;
    return (
      <div class={clsx('px-8 lg:px-10', props.class)}>
        <InputLabel name={name} label={label} required={required} />
        <input
          {...props}
          class="w-full"
          type="range"
          id={name}
          value={input}
          aria-invalid={!!errors?.value}
          aria-errormessage={`${name}-error`}
        />
        <InputErrors name={name} errors={errors} />
      </div>
    );
  }
);
