<script lang="ts">
  import type { FieldElementProps } from '@formisch/svelte';
  import InputErrors from './InputErrors.svelte';
  import InputLabel from './InputLabel.svelte';

  interface Props extends FieldElementProps {
    class?: string;
    label?: string;
    accept?: string;
    required?: boolean;
    multiple?: boolean;
    input: File | File[] | null | undefined;
    errors: [string, ...string[]] | null;
  }

  let {
    class: className,
    label,
    name,
    required,
    multiple,
    input,
    errors,
    ...fieldProps
  }: Props = $props();

  const files = $derived(input ? (Array.isArray(input) ? input : [input]) : []);
</script>

<div class={['px-8 lg:px-10', className]}>
  <InputLabel {name} {label} {required} />
  <label
    class={[
      'relative flex min-h-[96px] w-full items-center justify-center rounded-2xl border-[3px] border-dashed border-slate-200 p-8 text-center focus-within:border-sky-600/50 hover:border-slate-300 md:min-h-[112px] md:text-lg lg:min-h-[128px] lg:p-10 lg:text-xl dark:border-slate-800 dark:focus-within:border-sky-400/50 dark:hover:border-slate-700',
      !files?.length && 'text-slate-500',
    ]}
  >
    {files?.length
      ? `Selected file${multiple ? 's' : ''}: ${files
          .map((file) => file?.name)
          .join(', ')}`
      : `Click or drag and drop file${multiple ? 's' : ''}`}
    <input
      {...fieldProps}
      id={name}
      {name}
      class="absolute h-full w-full cursor-pointer opacity-0"
      {required}
      {multiple}
      aria-invalid={!!errors}
      aria-errormessage={`${name}-error`}
      type="file"
    />
  </label>
  <InputErrors {name} {errors} />
</div>
