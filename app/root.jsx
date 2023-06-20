import { cssBundleHref } from '@remix-run/css-bundle';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import styles from './routes/styles/main.css';

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: 'stylesheet', href: cssBundleHref }]
    : [{ rel: 'stylesheet', href: styles }]),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* Used to inject any metadata */}
        <Meta />
        {/* Inject any links (using the Remix Link Components) applying to pages */}
        <Links />
      </head>
      <body>
        {/* Where your pages get called to render to screen */}
        <Outlet />
        {/* Restoring hte scrollbar position if users navigate between pages */}
        <ScrollRestoration />
        {/* Injecting client side scripts when page is downloaded on the client side */}
        <Scripts />
        {/* Utility component to get live reload */}
        <LiveReload />
      </body>
    </html>
  );
}
