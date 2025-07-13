// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          {/* <title>SolidJS Playground | Formisch</title> */}
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <script
            // Add "dark" class for theming before browser has chance to paint to
            // prevent screen from flashing between two color modes
            innerHTML={`
              if (!window.matchMedia('(prefers-color-scheme: light)').matches) {
                document.documentElement.classList.add('dark');
              }
            `}
          />
          {assets}
        </head>
        <body
          class="font-lexend bg-white py-12 text-slate-600 md:py-14 lg:py-16 dark:bg-gray-900 dark:text-slate-400"
          lang="en"
        >
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
