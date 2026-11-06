import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="min-h-dvh bg-[#080B14] text-white antialiased">
      <div className="relative isolate min-h-dvh overflow-hidden">

        {/* Background Effects */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

          {/* Main background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1221] via-[#080B14] to-[#05070D]" />

          {/* Indigo ambient glow */}
          <div className="absolute -top-64 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/[0.10] blur-[150px]" />

          {/* Violet ambient glow */}
          <div className="absolute -bottom-64 -right-40 h-[600px] w-[600px] rounded-full bg-violet-600/[0.07] blur-[150px]" />

          {/* Subtle dot texture */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:32px_32px]" />

          {/* Dark vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.25)_100%)]" />
        </div>

        <div className="relative z-10 min-h-dvh">
          {children}
        </div>

        <ScrollRestoration />
        <Scripts />
      </div>
      </body>
      </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
