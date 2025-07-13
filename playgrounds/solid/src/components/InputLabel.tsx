import clsx from 'clsx';
import { Dynamic, Show } from 'solid-js/web';

type InputLabelProps = {
  name?: string;
  label?: string;
  required?: boolean;
  margin?: 'none';
};

/**
 * Input label for a form field.
 */
export function InputLabel(props: InputLabelProps) {
  return (
    <Show when={props.label}>
      <Dynamic
        component={props.name ? 'label' : 'div'}
        class={clsx(
          'inline-block font-medium md:text-lg lg:text-xl',
          !props.margin && 'mb-4 lg:mb-5'
        )}
        for={props.name}
      >
        {props.label}{' '}
        <Show when={props.required}>
          <span class="ml-1 text-red-600 dark:text-red-400">*</span>
        </Show>
      </Dynamic>
    </Show>
  );
}
