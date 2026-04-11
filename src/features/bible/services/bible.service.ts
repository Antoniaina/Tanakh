import path from "path";
import fs from "fs/promises";
import { Book, Chapter } from "../types/bible.types";


const BASE_PATH = path.join(process.cwd(), "src", "data", "baiboly-json");

function getBookPath(book: string): Record<string, string> {
    return {
        old: path.join(BASE_PATH, "Testameta taloha", `${book}.json`),
        new: path.join(BASE_PATH, "Testameta vaovao" , `${book}.json`)
    };
}

export async function getBook(book: string): Promise<Book> {
    const paths = getBookPath(book);

    for (const version of ["old", "new"]) {
        try {
            const file = fs.readFile(paths[version], "utf-8");
            return JSON.parse(await file) as Book;
        }
        catch (err) {
            if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
                console.error(`Failed reading ${book}: ${err}`);
            }
        }
    }

    throw new Error(`Book ${book} not found`);
}

export async function getChapter(book: string, chapter: string): Promise<Chapter> {
    const content = await getBook(book);

    if (!(chapter in content)) {
        throw new Error(`Chapter ${chapter} of ${book} not found`);
    }

    return content[chapter];
}

export async function getAllBooks(): Promise<string[]> {
    const bookList = await Promise.all( 
        ["Testameta taloha", "Testameta vaovao"].map(async books => {
           return (await fs.readdir(path.join(BASE_PATH, books)));
        })
    );
    
    const allBooks = bookList.flat().map(f => f.replace(".json", ""));

    return Array.from(new Set(allBooks));
}


