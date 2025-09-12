<script lang="ts">
  import UnstyledButton, {
    type DefaultButtonProps,
  } from './UnstyledButton.svelte';

  type ActionButtonProps = DefaultButtonProps & {
    variant: 'primary' | 'secondary';
    label: string;
  };

  let props: ActionButtonProps = $props();
</script>

<UnstyledButton
  {...props}
  class={[
    'relative flex cursor-pointer items-center justify-center rounded-2xl px-5 py-2.5 font-medium no-underline transition-colors md:text-lg lg:rounded-2xl lg:px-6 lg:py-3 lg:text-xl',
    {
      'bg-sky-600 text-white hover:bg-sky-600/80 dark:bg-sky-400 dark:text-gray-900 dark:hover:bg-sky-400/80':
        props.variant === 'primary',
      'bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20':
        props.variant === 'secondary',
    },
  ]}
>
  {props.label}
</UnstyledButton>
