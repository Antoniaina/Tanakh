import Link from "next/link";
import { getChapter } from "@/features/bible/services/bible.service";

type ChapterPageProps = {
    params: Promise<{ book: string; chapter: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
    const { book: encodedBook, chapter: encodedChapter } = await params;
    const book = decodeURIComponent(encodedBook);
    const chapter = decodeURIComponent(encodedChapter);
    const verses = await getChapter(book, chapter);
    const versesNumbers = Object.keys(verses);

    return (
        <div className="space-y-6" >
            <div className="flex flex-wrap flex-col justify-between gap-3">
                <Link
                    href={`/bible/${encodeURIComponent(book)}`}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {book}
                </Link>
                <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    Toko faha {chapter}
                </h2>
            </div>

            <article className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                {versesNumbers.map(verse => {
                    return (
                        <p 
                            key={verse}
                            className="text-sm leading-relaxed text-gray-800"
                        >
                            <span className="mr-2 font-mon text-xs text-gray-400">{verse}</span>
                            {verses[verse]}
                        </p>
                    )
                })}
            </article>
        </div>
    )
}