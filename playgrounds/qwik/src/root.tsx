import { $, component$, useOnWindow } from '@qwik.dev/core';
import { QwikRouterProvider, RouterOutlet } from '@qwik.dev/router';
import { Head } from './components';
import './global.css';
import { disableTransitions } from './utils';

export default component$(() => {
  /**
   * The root of a QwikRouter site always start with the <QwikRouterProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  useOnWindow('resize', $(disableTransitions));

  return (
    <QwikRouterProvider>
      <head>
        <Head />
      </head>
      <body
        class="font-lexend bg-white py-12 text-slate-600 md:py-14 lg:py-16 dark:bg-gray-900 dark:text-slate-400"
        lang="en"
      >
        <RouterOutlet />
      </body>
    </QwikRouterProvider>
  );
});
