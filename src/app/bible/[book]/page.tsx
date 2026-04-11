import Link from "next/link";
import { getBook } from "@/features/bible/services/bible.service";

type BookPageProps = {
    params: Promise<{ book: string }>
}

export default async function BookPage({ params }: BookPageProps) {
    const { book:encodedBook } = await params;
    const book = decodeURIComponent(encodedBook);
    const { meta, ...chapters } = await getBook(book);
    const chapterNumbers = Object.keys(chapters);
    
    return (
        <div className="space-y-6">
            <header className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900">
                    {book}
                </h2>
                <p className="text-sm text-gray-500">Misafidiana toko — misy toko {meta.chapter_number}</p>
            </header>

            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
                {chapterNumbers.map((ch) => {
                    return (
                        <li key={ch}>
                            <Link
                                href={`/bible/${encodeURIComponent(book)}/${encodeURIComponent(ch)}`}
                                className="flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 font-medium  hover:bg-gray-50 transition-colors"
                            >
                                {ch}
                            </Link>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}