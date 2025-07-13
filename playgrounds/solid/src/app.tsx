import { makeEventListener } from '@solid-primitives/event-listener';
import { MetaProvider } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { isServer } from 'solid-js/web';
import { Tabs } from './components';
import './global.css';
import { disableTransitions } from './utils';

export default function App() {
  // Disable CSS transitions while window is resized
  if (!isServer) {
    makeEventListener(window, 'resize', disableTransitions);
  }

  return (
    <MetaProvider>
      <Router
        root={(props) => (
          <Suspense>
            <Tabs items={['Login', 'Payment', 'Todos', 'Special', 'Nested']} />
            <main>{props.children}</main>
          </Suspense>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
