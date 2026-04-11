export type Verse = string;

export type Chapter = {
    [VerseNumber: string]: Verse;
}

export type Book = {
    [ChapterNumber: string]: Chapter;
}