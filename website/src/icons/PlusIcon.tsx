import { component$, type PropsOf } from '@qwik.dev/core';

export const PlusIcon = component$<PropsOf<'svg'>>((props) => (
  <svg
    viewBox="0 0 40 48"
    role="img"
    aria-label="Plus icon"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-width={4}
    {...props}
  >
    <path d="M20 7.7v32.5m16.25-16.25H3.75" />
  </svg>
));
