import './globals.css';
import { ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-gradient-to-b from-white to-gray-50 text-gray-900 antialiased">
        <div className="mx-auto min-h-dvh max-w-5xl px-4 sm:px-6">
          <header className="sticky top-0 z-10 -mx-4 border-b border-gray-200/70 bg-white/80 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <h1 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                  Tanakh
                </h1>
                <span className="hidden text-sm text-gray-500 sm:inline">
                  Famakiana tsotra
                </span>
              </div>
              <div className="text-xs text-gray-500">
                v0.1
              </div>
            </div>
          </header>

          <main className="py-6 sm:py-10">
            {children}
          </main>

          <footer className="pb-8 pt-10 text-center text-xs text-gray-500">
            <div className="mx-auto max-w-2xl">
              <div className="h-px w-full sticky bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <p className="mt-5">
                © 2026 Tanakh — Baiboly amin’ny endrika local.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}