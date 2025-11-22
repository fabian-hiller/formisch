<script lang="ts">
  interface Props {
    type?: 'button' | 'submit';
    color: 'green' | 'yellow' | 'purple' | 'blue' | 'red';
    label: string;
    width?: 'auto';
    onclick?: () => void;
  }

  let { type = 'button', color, label, width, onclick }: Props = $props();
</script>

<button
  class={[
    'h-14 rounded-2xl border-2 bg-white px-5 font-medium md:h-16 md:text-lg lg:h-[70px] lg:px-6 lg:text-xl dark:bg-gray-900',
    {
      'border-emerald-600/20 text-emerald-600 hover:bg-emerald-600/10 dark:border-emerald-400/20 dark:text-emerald-400 dark:hover:bg-emerald-400/10':
        color === 'green',
      'border-yellow-600/20 text-yellow-600 hover:bg-yellow-600/10 dark:border-amber-300/20 dark:text-amber-300 dark:hover:bg-amber-300/10':
        color === 'yellow',
      'border-purple-600/20 text-purple-600 hover:bg-purple-600/10 dark:border-purple-400/20 dark:text-purple-400 dark:hover:bg-purple-400/10':
        color === 'purple',
      'border-sky-600/20 text-sky-600 hover:bg-sky-600/10 dark:border-sky-400/20 dark:text-sky-400 dark:hover:bg-sky-400/10':
        color === 'blue',
      'border-red-600/20 text-red-600 hover:bg-red-600/10 dark:border-red-400/20 dark:text-red-400 dark:hover:bg-red-400/10':
        color === 'red',
      'w-full md:w-auto': width !== 'auto',
    },
  ]}
  {type}
  {onclick}
>
  {label}
</button>
