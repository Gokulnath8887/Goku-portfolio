import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { Toaster } from 'sonner';
import './global.css';

export const links = () => [];

export const meta = () => {
  return [
    { title: "P GOKULNATH | FULLSTACK | AUTOMATION | DIGITAL MARKETER" },
    { name: "description", content: "Portfolio of P Gokulnath - Fullstack Developer, Automation Specialist & Digital Marketer" }
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>P GOKULNATH | FULLSTACK | AUTOMATION | DIGITAL MARKETER</title>
        <Meta />
        <Links />
        <link rel="icon" href="/favicon.jpg" />
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" />
        <ScrollRestoration />
        <Scripts />
        <script src="https://kit.fontawesome.com/2c15cc0cc7.js" crossOrigin="anonymous" async />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-2xl font-bold">App Error</h1>
      <p className="text-gray-500">Something went wrong.</p>
    </div>
  );
}
