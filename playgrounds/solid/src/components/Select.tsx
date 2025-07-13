import clsx from 'clsx';
import { createMemo, For, JSX, Show, splitProps } from 'solid-js';
import { AngleDownIcon } from '~/icons';
import { InputErrors } from './InputErrors';
import { InputLabel } from './InputLabel';

type SelectProps = {
  class?: string;
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  multiple?: boolean;
  size?: number;
  placeholder?: string;
  required?: boolean;
  input: string | string[] | null | undefined;
  errors: [string, ...string[]] | null;
  ref: (element: HTMLSelectElement) => void;
  onFocus: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
  onInput: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onBlur: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
};

/**
 * Select field that allows users to select predefined values. Various
 * decorations can be displayed in or around the field to communicate the
 * entry requirements.
 */
export function Select(props: SelectProps) {
  // Split select element props
  const [, selectProps] = splitProps(props, [
    'class',
    'input',
    'options',
    'label',
    'errors',
  ]);

  // Create memoized value of selected values
  const getValues = createMemo(() =>
    Array.isArray(props.input)
      ? props.input
      : typeof props.input === 'string'
        ? [props.input]
        : []
  );

  return (
    <div class={clsx('px-8 lg:px-10', props.class)}>
      <InputLabel
        name={props.name}
        label={props.label}
        required={props.required}
      />
      <div class="relative flex items-center">
        <select
          {...selectProps}
          class={clsx(
            'w-full appearance-none space-y-2 rounded-2xl border-2 bg-transparent px-5 outline-none md:text-lg lg:space-y-3 lg:px-6 lg:text-xl',
            props.errors
              ? 'border-red-600/50 dark:border-red-400/50'
              : 'border-slate-200 hover:border-slate-300 focus:border-sky-600/50 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-sky-400/50',
            props.multiple ? 'py-5' : 'h-14 md:h-16 lg:h-[70px]',
            props.placeholder && !getValues()?.length && 'text-slate-500'
          )}
          id={props.name}
          aria-invalid={!!props.errors}
          aria-errormessage={`${props.name}-error`}
        >
          <option value="" disabled hidden selected={!props.input}>
            {props.placeholder}
          </option>
          <For each={props.options}>
            {({ label, value }) => (
              <option value={value} selected={getValues().includes(value)}>
                {label}
              </option>
            )}
          </For>
        </select>
        <Show when={!props.multiple}>
          <AngleDownIcon class="pointer-events-none absolute right-6 h-5 lg:right-8 lg:h-6" />
        </Show>
      </div>
      <InputErrors name={props.name} errors={props.errors} />
    </div>
  );
}
