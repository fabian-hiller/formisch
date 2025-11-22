<script lang="ts">
  import type { FieldElementProps } from '@formisch/svelte';
  import InputErrors from './InputErrors.svelte';
  import InputLabel from './InputLabel.svelte';

  interface Props extends FieldElementProps {
    class?: string;
    type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date';
    label?: string;
    placeholder?: string;
    required?: boolean;
    input: string | number | undefined;
    errors: [string, ...string[]] | null;
  }

  let {
    class: className,
    label,
    name,
    required,
    input,
    errors,
    ...fieldProps
  }: Props = $props();

  let value: string | number | undefined = $state();

  $effect(() => {
    if (!Number.isNaN(input)) {
      value = input;
    }
  });
</script>

<div class={['px-8 lg:px-10', className]}>
  <InputLabel {name} {label} {required} />
  <input
    {...fieldProps}
    id={name}
    {name}
    class={[
      'h-14 w-full rounded-2xl border-2 bg-white px-5 outline-none placeholder:text-slate-500 md:h-16 md:text-lg lg:h-[70px] lg:px-6 lg:text-xl dark:bg-gray-900',
      {
        'border-red-600/50 dark:border-red-400/50': errors,
        'border-slate-200 hover:border-slate-300 focus:border-sky-600/50 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-sky-400/50':
          !errors,
      },
    ]}
    {value}
    {required}
    aria-invalid={!!errors}
    aria-errormessage={`${name}-error`}
  />
  <InputErrors {name} {errors} />
</div>
