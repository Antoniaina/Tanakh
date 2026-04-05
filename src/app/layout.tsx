import './globals.css';
import { ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Tanakh Reader</h1>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-gray-200 text-gray-700 p-4 text-center">
          © 2026 Tanakh App
        </footer>
      </body>
    </html>
  );
}