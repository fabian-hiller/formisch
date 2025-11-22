import { component$ } from '@qwik.dev/core';
import { QwikRouterProvider, RouterOutlet } from '@qwik.dev/router';
import { HeadContent } from './components';
import './styles/root.css';
import { disableTransitions } from './utils';

export default component$(() => (
  <QwikRouterProvider>
    <head>
      <HeadContent />
    </head>
    <body
      class="font-lexend flex min-h-screen flex-col bg-white text-slate-600 dark:bg-gray-900 dark:text-slate-400"
      window:onResize$={() => disableTransitions()}
    >
      <RouterOutlet />
    </body>
  </QwikRouterProvider>
));
