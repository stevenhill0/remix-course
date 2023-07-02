import { cssBundleHref } from '@remix-run/css-bundle';

import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import MainNavigation from './components/MainNavigation';

import styles from './styles/main.css';

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
        <header>
          {/* Setting MainNavigation here to target ALL routes/pages */}
          <MainNavigation />
        </header>
        {/* Where your pages get called to render to screen */}
        <Outlet />
        {/* Restoring the scrollbar position if users navigate between pages */}
        <ScrollRestoration />
        {/* Injecting client side scripts when page is downloaded on the client side */}
        <Scripts />
        {/* Utility component to get live reload */}
        <LiveReload />
      </body>
    </html>
  );
}

// Use useRouteError to pull the error message
export const ErrorBoundary = () => {
  const routeError = useRouteError();
  // For frontend Errors
  const message = routeError.message || 'Oops! Something went wrong.';

  // Catching server errors
  // For V2 Convention CatchBoundary is no longer used
  // isRouteErrorResponse() v2 convention replaces useCatch() from V1 convention for printing thrown responses
  // Renders whenever an action or loader throws a Response
  if (isRouteErrorResponse(routeError)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {/* Used to inject any metadata */}
          <Meta />
          {/* Inject any links (using the Remix Link Components) applying to pages */}
          <Links />
          <title>{routeError.statusText}</title>
        </head>
        <body>
          <header>
            {/* Setting MainNavigation here to target ALL routes/pages */}
            <MainNavigation />
          </header>
          {/* Error Message */}
          <main className="error">
            <h1>{routeError.statusText}</h1>
            <p>{routeError.data?.message || 'Something went wrong!'}</p>
            <p>
              Back to <Link to="/">safety</Link>!
            </p>
          </main>
          {/* Restoring the scrollbar position if users navigate between pages */}
          <ScrollRestoration />
          {/* Injecting client side scripts when page is downloaded on the client side */}
          <Scripts />
          {/* Utility component to get live reload */}
          <LiveReload />
        </body>
      </html>
    );
  }

  // Frontend errors for routes
  // Renders whenever there is an error anywhere on the route, either during rendering or during data loading.
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* Used to inject any metadata */}
        <Meta />
        {/* Inject any links (using the Remix Link Components) applying to pages */}
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <header>
          {/* Setting MainNavigation here to target ALL routes/pages */}
          <MainNavigation />
        </header>
        {/* Error Message */}
        <main className="error">
          <h1>An error occurred</h1>
          <p>{message}</p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>
        {/* Restoring the scrollbar position if users navigate between pages */}
        <ScrollRestoration />
        {/* Injecting client side scripts when page is downloaded on the client side */}
        <Scripts />
        {/* Utility component to get live reload */}
        <LiveReload />
      </body>
    </html>
  );
};

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: 'stylesheet', href: cssBundleHref }]
    : [{ rel: 'stylesheet', href: styles }]),
];
