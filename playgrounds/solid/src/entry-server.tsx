// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body class="font-lexend bg-white py-12 text-slate-600 md:py-14 lg:py-16 dark:bg-gray-900 dark:text-slate-400">
          <div
            id="app"
            class="space-y-12 md:space-y-14 lg:mx-auto lg:max-w-6xl lg:space-y-16"
          >
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));
