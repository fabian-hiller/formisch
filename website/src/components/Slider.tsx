import { component$, type QRL, type ReadonlySignal } from '@qwik.dev/core';
import clsx from 'clsx';
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
  ref: QRL<(element: HTMLInputElement) => void>;
  onFocus$: QRL<(event: FocusEvent, element: HTMLInputElement) => void>;
  onInput$: QRL<(event: InputEvent, element: HTMLInputElement) => void>;
  onChange$: QRL<(event: Event, element: HTMLInputElement) => void>;
  onBlur$: QRL<(event: FocusEvent, element: HTMLInputElement) => void>;
};

/**
 * Range slider that allows users to select predefined numbers. Various
 * decorations can be displayed in or around the field to communicate the
 * entry requirements.
 */
export const Slider = component$(
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
          value={input.value}
          aria-invalid={!!errors.value}
          aria-errormessage={`${name}-error`}
        />
        <InputErrors name={name} errors={errors} />
      </div>
    );
  }
);
