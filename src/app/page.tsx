import Link from "next/link";
import { getAllBooks } from "@/features/bible/services/bible.service";

const books = await getAllBooks();

export default function Home() {
  
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-base font-semibold text-gray-900">Boky</h3>
          <div className="text-xs text-gray-500">misy boky {books.length}</div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {books.map((book) => {
            const href = `/bible/${encodeURIComponent(book)}/`;
            return (
              <Link
                key={book}
                href={href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              >
                <span className="font-medium">{book}</span>
                <span className="text-xs text-gray-500 transition-transform group-hover:translate-x-0.5">
                  Vakio →
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
