import Link from "next/link";
import { getBooksMeta } from "@/features/bible/services/bible.service";

const booksMeta = await getBooksMeta();

export default function Home() {
  
  return (
    <div className="space-y-6">
      {Object.entries(booksMeta).map(([testament, books]) => (
        <section
          key={testament}
          className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              {testament}
            </h3>
            <span className="text-xs text-gray-500">
              misy boky {books.length}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {books.map((book) => {
              const href = `/bible/${encodeURIComponent(book)}`;

              return (
                <Link
                  key={book}
                  href={href}
                  className="group flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50"
                >
                  <span className="font-medium">{book}</span>
                  <span className="text-xs text-gray-500">
                    Vakio →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
