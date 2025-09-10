<script lang="ts">
  import type { FieldElementProps } from '@formisch/svelte';
  import InputErrors from './InputErrors.svelte';
  import InputLabel from './InputLabel.svelte';

  interface Props extends FieldElementProps {
    class?: string;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
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
</script>

<div class={['px-8 lg:px-10', className]}>
  <InputLabel {name} {label} {required} />
  <input
    {...fieldProps}
    id={name}
    {name}
    class="w-full"
    value={input}
    {required}
    aria-invalid={!!errors}
    aria-errormessage={`${name}-error`}
    type="range"
  />
  <InputErrors {name} {errors} />
</div>
