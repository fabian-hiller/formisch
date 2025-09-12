<script lang="ts">
  import Spinner from './Spinner.svelte';
  import type { Snippet } from 'svelte';

  type LinkProps = {
    type: 'link';
    href?: string;
    download?: boolean | string;
    target?: '_blank';
    ariaLabel?: string;
  };

  type ButtonProps = {
    type: 'button' | 'reset' | 'submit';
    onClick?: () => unknown;
    loading?: boolean;
    form?: string;
    ariaLabel?: string;
  };

  export type DefaultButtonProps = LinkProps | ButtonProps;

  interface Props {
    children: Snippet;
    class?: string | Array<string | Record<string, boolean>>;
  }

  let {
    children,
    class: className,
    ...restProps
  }: Props & DefaultButtonProps = $props();
  let isLoading = $state(false);

  const handleClick = async () => {
    if (
      restProps.type !== 'link' &&
      'onClick' in restProps &&
      restProps.onClick
    ) {
      isLoading = true;
      try {
        await restProps.onClick();
      } finally {
        isLoading = false;
      }
    }
  };
</script>

{#if restProps.type === 'link'}
  <a
    href={restProps.href}
    download={restProps.download}
    target={restProps.target}
    rel={restProps.target === '_blank' ? 'noreferrer' : undefined}
    aria-label={restProps.ariaLabel}
    class={className}
  >
    {@render children()}
  </a>
{:else}
  <button
    type={restProps.type}
    disabled={isLoading || ('loading' in restProps ? restProps.loading : false)}
    form={'form' in restProps ? restProps.form : undefined}
    aria-label={restProps.ariaLabel}
    onclick={handleClick}
    class={className}
  >
    <span
      class={[
        'transition-[opacity,transform,visibility] duration-200',
        {
          'invisible translate-x-5 opacity-0':
            isLoading || ('loading' in restProps ? restProps.loading : false),
          'visible delay-300': !(
            isLoading || ('loading' in restProps ? restProps.loading : false)
          ),
        },
      ]}
    >
      {@render children()}
    </span>
    <span
      class={[
        'absolute duration-200',
        {
          'visible delay-300':
            isLoading || ('loading' in restProps ? restProps.loading : false),
          'invisible -translate-x-5 opacity-0': !(
            isLoading || ('loading' in restProps ? restProps.loading : false)
          ),
        },
      ]}
    >
      <Spinner />
    </span>
  </button>
{/if}
