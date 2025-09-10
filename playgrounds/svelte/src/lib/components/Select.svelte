<script lang="ts">
  import type { FieldElementProps } from '@formisch/svelte';
  import AngleDownIcon from '../icons/AngleDownIcon.svelte';
  import InputErrors from './InputErrors.svelte';
  import InputLabel from './InputLabel.svelte';

  interface Props extends FieldElementProps {
    class?: string;
    label?: string;
    options: { label: string; value: string }[];
    multiple?: boolean;
    size?: number;
    placeholder?: string;
    required?: boolean;
    input: string | string[] | null | undefined;
    errors: [string, ...string[]] | null;
  }

  let {
    class: className,
    label,
    name,
    options,
    multiple,
    placeholder,
    required,
    input,
    errors,
    ...fieldProps
  }: Props = $props();

  // Create derived value of selected values
  const values = $derived(
    Array.isArray(input)
      ? input
      : input && typeof input === 'string'
        ? [input]
        : []
  );
</script>

<div class={['px-8 lg:px-10', className]}>
  <InputLabel {name} {label} {required} />
  <div class="relative flex items-center">
    <select
      {...fieldProps}
      id={name}
      {name}
      class={[
        'w-full appearance-none space-y-2 rounded-2xl border-2 bg-transparent px-5 outline-none md:text-lg lg:space-y-3 lg:px-6 lg:text-xl',
        errors
          ? 'border-red-600/50 dark:border-red-400/50'
          : 'border-slate-200 hover:border-slate-300 focus:border-sky-600/50 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-sky-400/50',
        multiple ? 'py-5' : 'h-14 md:h-16 lg:h-[70px]',
        placeholder && !values?.length && 'text-slate-500',
      ]}
      {multiple}
      {required}
      aria-invalid={!!errors}
      aria-errormessage={`${name}-error`}
    >
      <option value="" disabled hidden selected={values.length === 0}>
        {placeholder}
      </option>
      {#each options as option (option.value)}
        <option value={option.value} selected={values?.includes(option.value)}>
          {option.label}
        </option>
      {/each}
    </select>
    {#if !multiple}
      <AngleDownIcon
        class="pointer-events-none absolute right-6 h-5 lg:right-8 lg:h-6"
      />
    {/if}
  </div>
  <InputErrors {name} {errors} />
</div>
