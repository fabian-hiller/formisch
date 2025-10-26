import { component$, type PropsOf } from '@qwik.dev/core';

export const VueIcon = component$<PropsOf<'svg'>>((props) => (
  <svg viewBox="0 0 50 48" role="img" aria-label="Vue.js icon" {...props}>
    <path fill="#42b883" d="M30.77 3 25 12.93 19.23 3H0l25 43L50 3z" />
    <path fill="#35495e" d="M30.77 3 25 12.93 19.23 3H10l15 25.8L40 3z" />
  </svg>
));
